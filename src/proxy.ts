import { NextResponse, type NextRequest } from "next/server";
import { collections, products } from "@/data/products";

/**
 * Product and collection URLs are statically generated. With Cache Components
 * the fallback shell is served before `notFound()` runs, so unknown slugs would
 * otherwise answer with a 200 status on their first request. Rejecting them here
 * keeps the HTTP status honest.
 */
export function proxy(request: NextRequest) {
  const [section, slug, ...rest] = request.nextUrl.pathname
    .split("/")
    .filter(Boolean);

  if (rest.length === 0 && slug) {
    const missing =
      (section === "products" && !products.some((item) => item.slug === slug)) ||
      (section === "collections" &&
        !collections.some((item) => item.slug === slug));

    if (missing) {
      return NextResponse.rewrite(new URL("/not-found", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/products/:path*", "/collections/:path*"],
};
