import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { collections } from "@/data/products";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Reveal } from "@/components/shared/Reveal";

export function FeaturedCollections() {
  const [primary, ...rest] = collections;

  return (
    <section className="section">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow="Collections"
            title="Four ways to live with less, better."
            description="Each collection is built around a way of living rather than a season — quiet tailoring, off-duty ease, and objects for the home."
            href="/collections"
            linkLabel="All collections"
          />
        </Reveal>

        <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <CollectionCard
              collection={primary}
              className="aspect-[4/5] sm:aspect-[16/13] lg:aspect-auto lg:h-full lg:min-h-[640px]"
              large
            />
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:col-span-5 lg:grid-cols-1 lg:gap-8">
            {rest.slice(0, 2).map((collection, index) => (
              <Reveal key={collection.slug} delay={0.08 * (index + 1)}>
                <CollectionCard
                  collection={collection}
                  className="aspect-[4/3] lg:aspect-[16/10]"
                />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type CollectionCardProps = {
  collection: (typeof collections)[number];
  className?: string;
  large?: boolean;
};

function CollectionCard({ collection, className, large }: CollectionCardProps) {
  return (
    <Link
      href={`/collections/${collection.slug}`}
      className={`group relative block overflow-hidden rounded-2xl bg-muted ${className ?? ""}`}
    >
      <Image
        src={collection.image}
        alt={collection.name}
        fill
        sizes={large ? "(max-width: 1024px) 100vw, 58vw" : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 30vw"}
        className="object-cover transition-transform duration-[1100ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.045]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-7">
        <div>
          <p className="text-[10px] font-medium tracking-[0.2em] text-white/65 uppercase">
            {collection.tagline}
          </p>
          <h3
            className={`mt-2 font-display font-light tracking-[-0.015em] ${
              large ? "text-3xl sm:text-4xl lg:text-5xl" : "text-2xl sm:text-[28px]"
            }`}
          >
            {collection.name}
          </h3>
          {large ? (
            <p className="mt-3 hidden max-w-sm text-[13px] leading-relaxed text-white/70 sm:block">
              {collection.description}
            </p>
          ) : null}
        </div>

        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-white/30 backdrop-blur-sm transition-all duration-300 group-hover:bg-white group-hover:text-ink">
          <ArrowUpRight className="size-4" />
        </span>
      </div>
    </Link>
  );
}
