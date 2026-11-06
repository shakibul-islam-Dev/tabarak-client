import type { Metadata } from "next";
import { Suspense } from "react";
import { ShopBrowser } from "@/components/products/ShopBrowser";
import { ShopSkeleton } from "@/components/products/ShopSkeleton";

export const metadata: Metadata = {
  title: "Shop all",
  description:
    "Browse every Tabark piece — apparels, footwear, bags, jewelry and objects for the home.",
};

type ShopPageProps = {
  searchParams: Promise<{ category?: string; q?: string }>;
};

export default function ShopPage({ searchParams }: ShopPageProps) {
  return (
    <>
      <section className="shell pt-12 pb-8 sm:pt-16 lg:pt-20 lg:pb-10">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Shop</p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98] font-light tracking-[-0.03em]">
            Every piece,
            <br />
            considered.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            Sixteen things we believe are worth owning — cut from natural
            materials, produced in small runs, and made to stay with you.
          </p>
        </div>
      </section>

      <Suspense fallback={<ShopSkeleton />}>
        <ShopContent searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function ShopContent({ searchParams }: ShopPageProps) {
  const { category = "all", q = "" } = await searchParams;

  return (
    <ShopBrowser
      key={`${category}:${q}`}
      initialCategory={category}
      initialQuery={q}
    />
  );
}
