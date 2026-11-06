import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Recycle, Wrench } from "lucide-react";
import {
  campaignImage,
  newsletterImage,
  storyImage,
} from "@/data/products";
import { Reveal } from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Our story",
  description:
    "Tabark is a small essentials house in Dhaka making clothing, leather and objects in limited runs from natural materials.",
};

const stats = [
  { value: "2026", label: "Founded in Dhaka" },
  { value: "12", label: "Partner workshops" },
  { value: "94%", label: "Natural or recycled fibres" },
  { value: "Lifetime", label: "Complimentary repairs" },
];

const principles = [
  {
    icon: Leaf,
    title: "Material first",
    copy: "We start with fibre, not silhouette. Organic cotton, European linen, vegetable-tanned leather and recycled precious metals — chosen because they wear in, not out.",
  },
  {
    icon: Recycle,
    title: "Small runs",
    copy: "Every piece is produced in limited quantities with workshops we know by name. No overproduction, no end-of-season landfill, no artificial urgency.",
  },
  {
    icon: Wrench,
    title: "Keep it alive",
    copy: "Repairs are free for life. We'd rather mend the thing you already own than sell you a replacement — and we'll show you how to look after it.",
  },
];

const journal = [
  {
    date: "September 2026",
    title: "Why we only make sixteen things",
    excerpt:
      "A tight range is harder than a big one. It means saying no to good ideas, and living with the same pieces for years. Here's how we decide what stays.",
  },
  {
    date: "August 2026",
    title: "A morning at the ceramic studio",
    excerpt:
      "The vases begin as a bag of clay and end as a quiet object on your shelf. We spent a morning with the makers to follow the process from wedging to glaze.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="shell pt-12 pb-14 sm:pt-16 lg:pt-20 lg:pb-20">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <p className="eyebrow mb-4">Our story</p>
            <h1 className="font-display text-[clamp(2.5rem,6.4vw,5rem)] leading-[0.98] font-light tracking-[-0.03em]">
              We make fewer things,
              <br />
              and make them properly.
            </h1>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              Tabark is a small essentials house in Dhaka. We design clothing,
              leather and objects for the home — in limited runs, from materials
              that age well, at prices that reflect the work behind them.
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
              We started in 2026 with a single question: what would we still want
              to wear in ten years? Everything we make is an attempt to answer
              it.
            </p>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted lg:col-span-5">
            <Image
              src={storyImage}
              alt="Garments hanging in the Tabark studio"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-sand/50">
        <div className="shell grid grid-cols-2 gap-x-6 gap-y-8 py-10 lg:grid-cols-4 lg:py-12">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p className="font-display text-3xl font-light tracking-[-0.02em] sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-2 text-[10.5px] tracking-[0.14em] text-muted-foreground uppercase">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="eyebrow mb-4">The approach</p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.03] font-light tracking-[-0.025em]">
              A quiet reaction to the way things are made.
            </h2>
          </div>
          <div className="space-y-5 text-[14px] leading-relaxed text-muted-foreground lg:col-span-7 lg:pt-10">
            <p>
              Most fashion is designed backwards: start with a trend, work out
              how cheaply it can be produced, then ask people to replace it in
              six months. We wanted to try the opposite. Start with materials we
              trust, work with people we can visit, and make only what we can
              stand behind.
            </p>
            <p>
              That means our range is small and it changes slowly. A shirt stays
              in the collection because it keeps earning its place, not because
              it&apos;s new. When something isn&apos;t right, we take it back to
              the pattern table rather than discount it.
            </p>
            <p>
              It also means we can tell you exactly where a piece came from —
              which mill spun the cotton, which workshop cut the leather, and
              who to talk to if it needs mending. That transparency isn&apos;t a
              marketing line; it&apos;s the only way we know how to work.
            </p>
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden">
        <Image
          src={campaignImage}
          alt="The Tabark studio campaign"
          fill
          sizes="100vw"
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-ink/60" />
        <div className="shell flex min-h-[420px] flex-col items-center justify-center py-20 text-center text-cream sm:min-h-[520px]">
          <Reveal>
            <p className="mx-auto max-w-2xl font-display text-[clamp(1.75rem,4vw,3rem)] leading-[1.15] font-light tracking-[-0.02em]">
              “The most sustainable thing you can own is the thing you
              don&apos;t need to replace.”
            </p>
            <p className="mt-6 text-[10.5px] tracking-[0.2em] text-cream/50 uppercase">
              Tabark — studio notes
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <Reveal>
            <p className="eyebrow mb-4">What we stand for</p>
            <h2 className="max-w-xl font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.03] font-light tracking-[-0.025em]">
              Three rules we don&apos;t break.
            </h2>
          </Reveal>

          <div className="mt-10 grid gap-8 border-t border-border pt-8 sm:grid-cols-3 sm:gap-10">
            {principles.map((principle, index) => (
              <Reveal key={principle.title} delay={index * 0.07}>
                <principle.icon className="size-5 text-brand" />
                <h3 className="mt-5 text-[14px] font-medium">
                  {principle.title}
                </h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
                  {principle.copy}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="journal" className="scroll-mt-28 border-t border-border bg-sand/40">
        <div className="shell section">
          <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
            <div>
              <p className="eyebrow mb-3">Journal</p>
              <h2 className="font-display text-3xl font-light tracking-[-0.02em] sm:text-4xl">
                Notes from
                <br />
                the studio.
              </h2>
              <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
                Occasional writing on materials, making and the things we keep.
              </p>
              <div className="relative mt-8 hidden aspect-[4/3] overflow-hidden rounded-2xl bg-muted lg:block">
                <Image
                  src={newsletterImage}
                  alt="Objects and textiles in the Tabark studio"
                  fill
                  sizes="30vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="divide-y divide-border border-y border-border">
              {journal.map((entry) => (
                <article key={entry.title} className="py-7">
                  <p className="text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                    {entry.date}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-light tracking-[-0.015em]">
                    {entry.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-[13px] leading-relaxed text-muted-foreground">
                    {entry.excerpt}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell text-center">
          <p className="eyebrow mb-4">Start here</p>
          <h2 className="mx-auto max-w-xl font-display text-[clamp(2rem,4.2vw,3.25rem)] leading-[1.03] font-light tracking-[-0.025em]">
            The collection is small on purpose.
          </h2>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/shop"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-[13px] font-medium text-primary-foreground transition-colors hover:bg-primary/85"
            >
              Shop all pieces
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/collections"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border px-7 text-[13px] font-medium transition-colors hover:bg-muted"
            >
              Browse collections
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
