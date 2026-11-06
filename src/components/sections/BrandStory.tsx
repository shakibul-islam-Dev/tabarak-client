"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { storyImage } from "@/data/products";

const pillars = [
  {
    title: "Natural fibres",
    copy: "Organic cotton, European linen, vegetable-tanned leather and recycled metals.",
  },
  {
    title: "Small batches",
    copy: "Produced in limited runs with workshops we visit, not factories we guess at.",
  },
  {
    title: "Repair, not replace",
    copy: "Free repairs for the life of every garment. Because good things should stay.",
  },
];

export function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { yPercent: -6, scale: 1.08 },
        {
          yPercent: 6,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );

      gsap.fromTo(
        copyRef.current,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: copyRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => context.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section overflow-hidden">
      <div className="shell grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="relative lg:col-span-6">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted sm:aspect-[5/5]">
            <div ref={imageRef} className="absolute inset-[-8%]">
              <Image
                src={storyImage}
                alt="A rail of garments inside the Tabark studio"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>

          <div className="absolute right-4 bottom-4 w-[190px] rounded-xl border border-border bg-background/90 p-4 backdrop-blur sm:right-6 sm:bottom-6 sm:w-[220px] sm:p-5">
            <p className="font-display text-3xl leading-none">12</p>
            <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
              partner workshops, each one paid a living wage and visited in
              person.
            </p>
          </div>
        </div>

        <div ref={copyRef} className="lg:col-span-6 lg:pl-4">
          <p className="eyebrow mb-4">Our story</p>
          <h2 className="font-display text-[clamp(2.25rem,4.4vw,3.75rem)] leading-[1.02] font-light tracking-[-0.025em]">
            Made slowly,
            <br />
            worn often.
          </h2>

          <p className="mt-6 max-w-md text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
            Tabark began with a simple frustration: beautiful things were being
            made to be replaced. So we started with the opposite question — what
            would we still want to wear in ten years?
          </p>
          <p className="mt-4 max-w-md text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
            Every piece starts with the material. We work with a small circle of
            mills and workshops, produce in limited runs, and keep the details
            quiet so the things you own stay in use.
          </p>

          <dl className="mt-9 divide-y divide-border border-t border-border">
            {pillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className="grid grid-cols-[2rem_1fr] gap-4 py-4 sm:grid-cols-[2.5rem_1fr]"
              >
                <span className="pt-0.5 text-[10px] tracking-[0.16em] text-muted-foreground">
                  0{index + 1}
                </span>
                <div>
                  <dt className="text-[13.5px] font-medium">{pillar.title}</dt>
                  <dd className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
                    {pillar.copy}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <Link
            href="/about"
            className="group mt-8 inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.08em] uppercase"
          >
            <span className="link-underline pb-0.5">Read the full story</span>
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
