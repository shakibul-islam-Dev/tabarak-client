import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight } from "lucide-react";
import {
  getProductBySlug,
  getRelatedProducts,
  products,
} from "@/data/products";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductPurchasePanel } from "@/components/products/ProductPurchasePanel";
import { ProductDetails } from "@/components/products/ProductDetails";
import { ProductGrid } from "@/components/products/ProductGrid";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0].src }],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const related = getRelatedProducts(product, 4);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.map((image) => image.src),
    brand: { "@type": "Brand", name: "Tabark" },
    offers: {
      "@type": "Offer",
      priceCurrency: "BDT",
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="shell pt-6 pb-16 sm:pt-8 lg:pb-24">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-[11px] text-muted-foreground">
            <li>
              <Link href="/" className="transition-colors hover:text-foreground">
                Home
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3" />
            </li>
            <li>
              <Link
                href="/shop"
                className="transition-colors hover:text-foreground"
              >
                Shop
              </Link>
            </li>
            <li aria-hidden="true">
              <ChevronRight className="size-3" />
            </li>
            <li aria-current="page" className="text-foreground">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="mt-6 grid gap-8 lg:mt-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 xl:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ProductGallery product={product} />
          </div>

          <div>
            <ProductPurchasePanel product={product} />
            <ProductDetails product={product} />
          </div>
        </div>
      </div>

      {related.length > 0 ? (
        <section className="border-t border-border bg-sand/40">
          <div className="shell section">
            <Reveal>
              <SectionHeading
                eyebrow="Complete the look"
                title="Pairs well with"
                href="/shop"
                linkLabel="Shop all"
              />
            </Reveal>
            <div className="mt-8 sm:mt-10">
              <ProductGrid products={related} />
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
