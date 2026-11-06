"use client";

import Image from "next/image";
import { useState } from "react";
import { Expand } from "lucide-react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import type { Product } from "@/types";
import { Badge } from "@/components/ui/badge";

const badgeVariant = {
  New: "brand",
  Bestseller: "default",
  Limited: "outline",
  Sale: "sale",
} as const;

export function ProductGallery({ product }: { product: Product }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const active = product.images[activeIndex] ?? product.images[0];

  return (
    <div className="grid gap-3 sm:grid-cols-[72px_1fr] sm:gap-4">
      {/* Thumbnails */}
      <div className="order-2 flex gap-2.5 sm:order-1 sm:flex-col">
        {product.images.map((image, index) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setActiveIndex(index)}
            aria-label={`View image ${index + 1} of ${product.images.length}`}
            aria-pressed={activeIndex === index}
            className={`relative aspect-[4/5] w-16 shrink-0 overflow-hidden rounded-lg border-2 bg-muted transition-colors sm:w-full ${
              activeIndex === index
                ? "border-foreground"
                : "border-transparent hover:border-border"
            }`}
          >
            <Image
              src={image.src}
              alt=""
              fill
              sizes="72px"
              className="object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="order-1 sm:order-2">
        <button
          type="button"
          onClick={() => setLightboxIndex(activeIndex)}
          aria-label={`Open ${product.name} image ${activeIndex + 1} in full screen`}
          className="group relative block aspect-[4/5] w-full cursor-zoom-in overflow-hidden rounded-2xl bg-muted"
        >
          <Image
            src={active.src}
            alt={active.alt}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
          />

          <div className="pointer-events-none absolute top-4 left-4 flex flex-col items-start gap-2">
            {product.badge ? (
              <Badge variant={badgeVariant[product.badge]}>
                {product.badge}
              </Badge>
            ) : null}
            {!product.inStock ? <Badge variant="muted">Sold out</Badge> : null}
          </div>

          <span className="pointer-events-none absolute right-4 bottom-4 flex size-10 items-center justify-center rounded-full bg-background/80 text-foreground opacity-0 shadow-sm backdrop-blur transition-opacity duration-300 group-hover:opacity-100">
            <Expand className="size-4" />
          </span>
        </button>

        <p className="mt-3 hidden text-[10px] tracking-[0.14em] text-muted-foreground uppercase sm:block">
          {activeIndex + 1} / {product.images.length} — Click to enlarge
        </p>
      </div>

      <Lightbox
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        index={lightboxIndex >= 0 ? lightboxIndex : 0}
        slides={product.images.map((image) => ({
          src: image.src,
          alt: image.alt,
        }))}
      />
    </div>
  );
}
