"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { cn } from "cn";
import type { Product } from "@/types";
import { discountPercent, formatPrice } from "@/lib/format";
import { useHydrated } from "@/hooks/use-hydrated";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { Badge } from "@/components/ui/badge";

const badgeVariant = {
  New: "brand",
  Bestseller: "default",
  Limited: "outline",
  Sale: "sale",
} as const;

type ProductCardProps = {
  product: Product;
  priority?: boolean;
  className?: string;
};

export function ProductCard({ product, priority, className }: ProductCardProps) {
  const hydrated = useHydrated();
  const addItem = useCartStore((state) => state.addItem);
  const wishlistIds = useWishlistStore((state) => state.ids);
  const toggleWishlist = useWishlistStore((state) => state.toggle);

  const saved = hydrated && wishlistIds.includes(product.id);
  const discount = discountPercent(product.price, product.compareAtPrice);
  const primary = product.images[0];
  const secondary = product.images[1];
  const isOneSize = product.sizes.length <= 1;

  const handleWishlist = () => {
    toggleWishlist(product.id);
    toast(saved ? "Removed from wishlist" : "Saved to wishlist", {
      description: product.name,
    });
  };

  const handleQuickAdd = () => {
    if (!product.inStock) return;
    addItem(product, { quantity: 1 });
    toast.success("Added to bag", { description: product.name });
  };

  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
        <Link
          href={`/products/${product.slug}`}
          className="absolute inset-0 z-0 block focus-visible:outline-none"
          aria-label={`View ${product.name}`}
        >
          <Image
            src={primary.src}
            alt={primary.alt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:opacity-0"
          />
          {secondary ? (
            <Image
              src={secondary.src}
              alt={secondary.alt}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover opacity-0 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:opacity-100"
            />
          ) : null}
        </Link>

        <div className="pointer-events-none absolute top-3 left-3 z-10 flex flex-col items-start gap-1.5">
          {product.badge ? (
            <Badge variant={badgeVariant[product.badge]}>
              {product.badge}
            </Badge>
          ) : null}
          {discount > 0 ? (
            <Badge variant="muted" className="bg-background/85 backdrop-blur">
              −{discount}%
            </Badge>
          ) : null}
          {!product.inStock ? <Badge variant="muted">Sold out</Badge> : null}
        </div>

        <button
          type="button"
          onClick={handleWishlist}
          aria-label={
            saved
              ? `Remove ${product.name} from wishlist`
              : `Save ${product.name} to wishlist`
          }
          aria-pressed={saved}
          className="absolute top-3 right-3 z-10 flex size-9 items-center justify-center rounded-full bg-background/80 text-foreground shadow-sm backdrop-blur transition-all duration-300 hover:bg-background hover:scale-105"
        >
          <Heart
            className={cn(
              "size-4 transition-colors",
              saved && "fill-current text-brand"
            )}
          />
        </button>

        <div className="absolute inset-x-3 bottom-3 z-10 lg:translate-y-2 lg:opacity-0 lg:transition-all lg:duration-300 lg:group-hover:translate-y-0 lg:group-hover:opacity-100 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100">
          {product.inStock ? (
            isOneSize ? (
              <button
                type="button"
                onClick={handleQuickAdd}
                className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-background/95 text-[12px] font-medium shadow-sm backdrop-blur transition-colors hover:bg-background"
              >
                <Plus className="size-3.5" />
                Quick add
              </button>
            ) : (
              <Link
                href={`/products/${product.slug}`}
                className="flex h-10 w-full items-center justify-center gap-2 rounded-full bg-background/95 text-[12px] font-medium shadow-sm backdrop-blur transition-colors hover:bg-background"
              >
                <ShoppingBag className="size-3.5" />
                Choose size
              </Link>
            )
          ) : (
            <span className="flex h-10 w-full items-center justify-center rounded-full bg-background/80 text-[12px] font-medium text-muted-foreground backdrop-blur">
              Sold out
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col pt-3.5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-[13.5px] leading-snug font-medium">
              <Link
                href={`/products/${product.slug}`}
                className="transition-colors hover:text-brand"
              >
                {product.name}
              </Link>
            </h3>
            <p className="mt-1 text-[10.5px] tracking-[0.12em] uppercase text-muted-foreground">
              {product.category}
            </p>
          </div>
          <div className="shrink-0 text-right">
            <p className="text-[13px] font-medium tabular-nums">
              {formatPrice(product.price)}
            </p>
            {product.compareAtPrice ? (
              <p className="text-[11px] text-muted-foreground line-through tabular-nums">
                {formatPrice(product.compareAtPrice)}
              </p>
            ) : null}
          </div>
        </div>

        {product.colors.length > 1 ? (
          <div className="mt-2.5 flex items-center gap-1.5" aria-hidden="true">
            {product.colors.slice(0, 4).map((color) => (
              <span
                key={color.name}
                title={color.name}
                className="size-2.5 rounded-full border border-black/10"
                style={{ backgroundColor: color.hex }}
              />
            ))}
          </div>
        ) : null}
      </div>
    </article>
  );
}
