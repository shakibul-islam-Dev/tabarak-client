import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Gift } from "lucide-react";
import { campaignImage } from "@/data/products";
import { Reveal } from "@/components/shared/Reveal";

export function Campaign() {
  return (
    <section className="bg-ink text-cream">
      <div className="grid lg:grid-cols-2">
        <Reveal className="flex items-center px-5 py-16 sm:px-8 sm:py-20 lg:px-16 lg:py-24">
          <div className="mx-auto w-full max-w-md">
            <p className="text-[10.5px] font-medium tracking-[0.22em] text-cream/50 uppercase">
              The gifting edit
            </p>
            <h2 className="mt-5 font-display text-[clamp(2.25rem,4.5vw,4rem)] leading-[1.02] font-light tracking-[-0.03em]">
              Wrapped,
              <br />
              and ready.
            </h2>
            <p className="mt-6 max-w-sm text-[14px] leading-relaxed text-cream/65">
              A short list of things worth giving — hand-thrown ceramics,
              recycled gold and quietly good leather. Every order arrives in
              recycled paper with a handwritten note.
            </p>

            <ul className="mt-8 space-y-3 text-[12.5px] text-cream/70">
              <li className="flex items-center gap-3">
                <Gift className="size-4 text-cream/50" />
                Complimentary gift wrapping on every order
              </li>
              <li className="flex items-center gap-3">
                <span className="size-1 rounded-full bg-cream/40" />
                Free returns until 10 January
              </li>
              <li className="flex items-center gap-3">
                <span className="size-1 rounded-full bg-cream/40" />
                Handwritten note included on request
              </li>
            </ul>

            <Link
              href="/collections/the-gifting-edit"
              className="group mt-9 inline-flex h-12 items-center gap-2 rounded-full bg-cream px-7 text-[13px] font-medium text-ink transition-colors hover:bg-white"
            >
              Explore the edit
              <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </Reveal>

        <div className="relative min-h-[380px] overflow-hidden sm:min-h-[480px] lg:min-h-[640px]">
          <Image
            src={campaignImage}
            alt="The Tabark gifting edit"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/30 to-transparent lg:bg-gradient-to-r lg:from-ink/40" />
        </div>
      </div>
    </section>
  );
}
