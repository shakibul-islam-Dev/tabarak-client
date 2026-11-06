import Image from "next/image";
import { storyImage } from "@/data/products";

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid min-h-[calc(100svh-8rem)] lg:grid-cols-[1.05fr_1fr]">
      <div className="relative hidden min-h-[560px] lg:block">
        <Image
          src={storyImage}
          alt="Inside the Tabark studio"
          fill
          priority
          sizes="52vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-black/10" />
        <div className="absolute bottom-12 left-12 max-w-sm text-white">
          <p className="text-[10px] font-medium tracking-[0.22em] text-white/60 uppercase">
            Tabark — Est. 2026
          </p>
          <p className="mt-4 font-display text-[2.5rem] leading-[1.05] font-light tracking-[-0.02em]">
            Fewer things,
            <br />
            chosen well.
          </p>
          <p className="mt-4 text-[12.5px] leading-relaxed text-white/60">
            An account keeps your wishlist, addresses and order history in one
            quiet place.
          </p>
        </div>
      </div>

      <div className="flex items-center justify-center px-5 py-12 sm:px-8 lg:px-12">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    </section>
  );
}
