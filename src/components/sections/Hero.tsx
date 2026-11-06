"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { heroImage } from "@/data/products";

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-ink">
      <motion.div
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 -z-10"
      >
        <Image
          src={heroImage}
          alt="Tabark autumn winter campaign"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%]"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/65 via-black/35 to-black/10" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/45 via-transparent to-black/10" />

      <div className="shell flex min-h-[calc(100svh-6.5rem)] flex-col justify-end pt-28 pb-14 text-white sm:pb-16 lg:min-h-[86svh] lg:pb-20">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          className="max-w-2xl"
        >
          <motion.p
            variants={fadeUp}
            className="text-[10.5px] font-medium tracking-[0.24em] text-white/70 uppercase"
          >
            Autumn / Winter 2026
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-5 font-display text-[clamp(2.75rem,7vw,5.5rem)] leading-[0.98] font-light tracking-[-0.03em] text-balance"
          >
            Considered pieces
            <br className="hidden sm:block" /> for an unhurried life.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 max-w-md text-[14px] leading-relaxed text-white/75 sm:text-[15px]"
          >
            Natural materials, quiet tailoring and objects made to last. The
            new season is a study in restraint — fewer things, chosen well.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Link
              href="/shop"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-cream px-7 text-[13px] font-medium text-ink transition-all duration-300 hover:bg-white active:scale-[0.99]"
            >
              Shop the collection
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              href="/collections/the-quiet-edit"
              className="inline-flex h-12 items-center justify-center rounded-full border border-white/35 px-7 text-[13px] font-medium text-white transition-colors duration-300 hover:border-white/70 hover:bg-white/10"
            >
              Explore the edit
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
          className="mt-14 flex items-end justify-between border-t border-white/15 pt-5 text-[10px] tracking-[0.18em] text-white/55 uppercase lg:mt-20"
        >
          <div className="flex items-center gap-3">
            <span className="hidden h-8 w-px bg-white/25 sm:block" />
            <span>Scroll to explore</span>
          </div>
          <div className="hidden items-center gap-8 sm:flex">
            <span>Complimentary shipping over ৳5,000</span>
            <span>Made in small batches</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
