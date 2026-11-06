import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  collections,
  getCollectionBySlug,
  getProductsByCollection,
} from "@/data/products";
import { ProductGrid } from "@/components/products/ProductGrid";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

type CollectionPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return collections.map((collection) => ({ slug: collection.slug }));
}

export async function generateMetadata({
  params,
}: CollectionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) return { title: "Collection not found" };

  return {
    title: collection.name,
    description: collection.description,
    openGraph: {
      title: `${collection.name} · Tabark`,
      description: collection.description,
      images: [{ url: collection.image }],
    },
  };
}

export default async function CollectionPage({ params }: CollectionPageProps) {
  const { slug } = await params;
  const collection = getCollectionBySlug(slug);

  if (!collection) notFound();

  const products = getProductsByCollection(collection.slug);
  const others = collections.filter((item) => item.slug !== collection.slug);

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink">
        <Image
          src={collection.image}
          alt={collection.name}
          fill
          priority
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/70 via-black/30 to-black/25" />

        <div className="shell flex min-h-[46svh] flex-col justify-between pt-8 pb-10 text-white sm:min-h-[52svh] lg:pb-14">
          <nav aria-label="Breadcrumb">
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.12em] text-white/65 uppercase transition-colors hover:text-white"
            >
              <ArrowLeft className="size-3.5" />
              All collections
            </Link>
          </nav>

          <div className="max-w-2xl">
            <p className="text-[10.5px] font-medium tracking-[0.22em] text-white/65 uppercase">
              {collection.tagline}
            </p>
            <h1 className="mt-4 font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.96] font-light tracking-[-0.03em]">
              {collection.name}
            </h1>
            <p className="mt-5 max-w-lg text-[13.5px] leading-relaxed text-white/70 sm:text-sm">
              {collection.description}
            </p>
          </div>
        </div>
      </section>

      <section className="shell py-10 lg:py-16">
        <div className="flex items-center justify-between border-b border-border pb-5">
          <p className="text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
            {products.length} {products.length === 1 ? "piece" : "pieces"}
          </p>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.1em] uppercase"
          >
            <span className="link-underline pb-0.5">Shop all</span>
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="mt-8 sm:mt-10">
          {products.length > 0 ? (
            <ProductGrid products={products} priorityCount={4} />
          ) : (
            <EmptyState
              title="This collection is resting"
              description="New pieces are on their way. In the meantime, browse the full range."
              action={
                <Button asChild variant="outline">
                  <Link href="/shop">Browse all pieces</Link>
                </Button>
              }
            />
          )}
        </div>
      </section>

      <section className="border-t border-border bg-sand/50">
        <div className="shell section">
          <div className="flex items-end justify-between gap-6">
            <h2 className="font-display text-3xl font-light tracking-[-0.02em] sm:text-4xl">
              Continue exploring
            </h2>
            <Link
              href="/collections"
              className="hidden text-[11px] font-medium tracking-[0.1em] uppercase underline underline-offset-4 sm:block"
            >
              All collections
            </Link>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-6">
            {others.map((item) => (
              <Link
                key={item.slug}
                href={`/collections/${item.slug}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-muted"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 33vw"
                  className="object-cover transition-transform duration-[1000ms] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="text-[9.5px] tracking-[0.18em] text-white/60 uppercase">
                    {item.tagline}
                  </p>
                  <p className="mt-1 font-display text-2xl font-light">
                    {item.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
