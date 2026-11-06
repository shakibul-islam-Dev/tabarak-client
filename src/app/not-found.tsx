import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="shell flex min-h-[65svh] items-center justify-center py-16">
      <div className="mx-auto max-w-lg text-center">
        <p className="font-display text-[clamp(5rem,14vw,9rem)] leading-none font-light tracking-[-0.04em] text-brand/25">
          404
        </p>
        <h1 className="mt-2 font-display text-4xl font-light tracking-[-0.02em]">
          This page has wandered off.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          The link may be old, or the piece may have sold out. Either way, the
          good stuff is still here.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-2.5 sm:flex-row">
          <Link
            href="/shop"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-7 text-[13px] font-medium text-primary-foreground transition-colors hover:bg-primary/85"
          >
            Shop all pieces
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-full border border-border px-7 text-[13px] font-medium transition-colors hover:bg-muted"
          >
            Back home
          </Link>
        </div>
      </div>
    </div>
  );
}
