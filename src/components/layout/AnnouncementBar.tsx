"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";

export function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative bg-ink text-cream/85">
      <div className="shell flex h-10 items-center justify-center gap-3 pr-8 text-center text-[10.5px] font-medium tracking-[0.16em] uppercase sm:text-[11px]">
        <p className="truncate">
          Complimentary shipping on orders over ৳5,000
          <span className="mx-3 hidden text-cream/30 sm:inline">/</span>
          <Link
            href="/collections/the-quiet-edit"
            className="group hidden items-center gap-1.5 text-cream transition-colors hover:text-white sm:inline-flex"
          >
            Discover The Quiet Edit
            <ArrowRight className="size-3 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </p>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss announcement"
        className="absolute inset-y-0 right-2 flex w-8 items-center justify-center text-cream/60 transition-colors hover:text-cream sm:right-4"
      >
        <X className="size-3.5" />
      </button>
    </div>
  );
}
