import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { collections, getProductsByCollection } from "@/data/products";
import { Reveal } from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Collections",
  description:
    "Four collections built around a way of living — quiet tailoring, off-duty ease and objects for the home.",
};

export default function CollectionsPage() {
  return (
    <>
      <section className="shell pt-12 pb-10 sm:pt-16 lg:pt-20">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Collections</p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98] font-light tracking-[-0.03em]">
            Four ways to live
            <br />
            with less, better.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            We don&apos;t design by season. Each collection is built around a
            way of living — and the pieces stay in the range for as long as they
            earn their place.
          </p>
        </div>
      </section>

      <section className="shell pb-20 lg:pb-28">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {collections.map((collection, index) => {
            const count = getProductsByCollection(collection.slug).length;

            return (
              <Reveal key={collection.slug} delay={index * 0.05}>
                <Link
                  href={`/collections/${collection.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted sm:aspect-[16/11]">
                    <Image
                      src={collection.image}
                      alt={collection.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-6">
                      <div>
                        <p className="text-[10px] font-medium tracking-[0.2em] text-white/65 uppercase">
                          {collection.tagline}
                        </p>
                        <h2 className="mt-1.5 font-display text-3xl font-light tracking-[-0.02em] sm:text-[34px]">
                          {collection.name}
                        </h2>
                      </div>
                      <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/30 backdrop-blur-sm transition-colors duration-300 group-hover:bg-white group-hover:text-ink">
                        <ArrowUpRight className="size-4" />
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-start justify-between gap-6">
                    <p className="max-w-md text-[13px] leading-relaxed text-muted-foreground">
                      {collection.description}
                    </p>
                    <p className="shrink-0 pt-0.5 text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">
                      {count} pieces
                    </p>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
