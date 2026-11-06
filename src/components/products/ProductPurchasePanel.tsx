"use client";

import { useState } from "react";
import { Heart, ShoppingBag, Star, Truck } from "lucide-react";
import { toast } from "sonner";
import { cn } from "cn";
import type { Product } from "@/types";
import { discountPercent, formatPrice } from "@/lib/format";
import { useHydrated } from "@/hooks/use-hydrated";
import { useCartStore } from "@/store/cart";
import { useWishlistStore } from "@/store/wishlist";
import { useUiStore } from "@/store/ui";
import { QuantityStepper } from "@/components/ui/quantity-stepper";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const hydrated = useHydrated();
  const addItem = useCartStore((state) => state.addItem);
  const openCart = useUiStore((state) => state.openCart);
  const wishlistIds = useWishlistStore((state) => state.ids);
  const toggleWishlist = useWishlistStore((state) => state.toggle);

  const requiresSize = product.sizes.length > 1;
  const [color, setColor] = useState(product.colors[0]?.name ?? "Default");
  const [size, setSize] = useState(requiresSize ? "" : product.sizes[0] ?? "One size");
  const [quantity, setQuantity] = useState(1);
  const [sizeError, setSizeError] = useState(false);

  const saved = hydrated && wishlistIds.includes(product.id);
  const discount = discountPercent(product.price, product.compareAtPrice);
  const maxQuantity = Math.max(1, Math.min(product.stock, 10));

  const handleAddToBag = () => {
    if (requiresSize && !size) {
      setSizeError(true);
      toast.error("Choose a size first", {
        description: "Select your size to add this piece to the bag.",
      });
      return;
    }

    addItem(product, { color, size, quantity });
    toast.success("Added to bag", {
      description: `${product.name}${size ? ` — ${size}` : ""}`,
    });
    openCart();
  };

  const handleWishlist = () => {
    toggleWishlist(product.id);
    toast(saved ? "Removed from wishlist" : "Saved to wishlist", {
      description: product.name,
    });
  };

  return (
    <div className="lg:pt-2">
      <p className="eyebrow">{product.category}</p>
      <h1 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-light tracking-[-0.025em]">
        {product.name}
      </h1>

      <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2">
        <div className="flex items-baseline gap-2.5">
          <p className="text-lg font-medium tabular-nums">
            {formatPrice(product.price)}
          </p>
          {product.compareAtPrice ? (
            <>
              <p className="text-sm text-muted-foreground line-through tabular-nums">
                {formatPrice(product.compareAtPrice)}
              </p>
              <span className="rounded-full bg-destructive/10 px-2 py-0.5 text-[10px] font-medium text-destructive">
                Save {discount}%
              </span>
            </>
          ) : null}
        </div>

        <span className="hidden h-4 w-px bg-border sm:block" />

        <div className="flex items-center gap-1.5">
          <div className="flex items-center gap-0.5" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                className={cn(
                  "size-3.5",
                  index < Math.round(product.rating)
                    ? "fill-brand text-brand"
                    : "text-border"
                )}
              />
            ))}
          </div>
          <span className="text-[11px] text-muted-foreground">
            {product.rating.toFixed(1)} ({product.reviewCount})
          </span>
        </div>
      </div>

      <p className="mt-5 max-w-lg text-[14px] leading-relaxed text-muted-foreground">
        {product.description}
      </p>

      {/* Colour */}
      <div className="mt-8">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-medium tracking-[0.14em] uppercase">
            Colour
          </p>
          <p className="text-[11px] text-muted-foreground">{color}</p>
        </div>
        <div className="mt-3 flex items-center gap-2.5">
          {product.colors.map((option) => (
            <button
              key={option.name}
              type="button"
              onClick={() => setColor(option.name)}
              aria-label={`Select colour ${option.name}`}
              aria-pressed={color === option.name}
              title={option.name}
              className={cn(
                "relative flex size-8 items-center justify-center rounded-full border transition-all",
                color === option.name
                  ? "border-foreground"
                  : "border-border hover:border-foreground/40"
              )}
            >
              <span
                className="size-6 rounded-full border border-black/5"
                style={{ backgroundColor: option.hex }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      {product.sizes.length > 0 ? (
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-medium tracking-[0.14em] uppercase">
              {product.sizes.length === 1 ? "Size" : "Select size"}
            </p>
            <a
              href="/contact#sizes"
              className="text-[11px] text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Size guide
            </a>
          </div>

          <div
            className="mt-3 flex flex-wrap gap-2"
            role="group"
            aria-label="Available sizes"
            aria-describedby={sizeError ? "size-error" : undefined}
          >
            {product.sizes.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  setSize(option);
                  setSizeError(false);
                }}
                aria-pressed={size === option}
                className={cn(
                  "flex h-10 min-w-12 items-center justify-center rounded-full border px-4 text-[12.5px] font-medium transition-all",
                  size === option
                    ? "border-foreground bg-foreground text-background"
                    : "border-border hover:border-foreground/40",
                  sizeError && !size && "border-destructive/60"
                )}
              >
                {option}
              </button>
            ))}
          </div>
          {sizeError ? (
            <p id="size-error" role="alert" className="mt-2 text-xs text-destructive">
              Please choose a size.
            </p>
          ) : null}
        </div>
      ) : null}

      {/* Quantity + add */}
      <div className="mt-7">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-medium tracking-[0.14em] uppercase">
            Quantity
          </p>
          {product.inStock ? (
            <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <span
                className={cn(
                  "size-1.5 rounded-full",
                  product.stock <= 8 ? "bg-amber-500" : "bg-emerald-600"
                )}
              />
              {product.stock <= 8
                ? `Only ${product.stock} left`
                : "In stock, ships in 1–2 days"}
            </p>
          ) : (
            <p className="text-[11px] text-muted-foreground">Sold out</p>
          )}
        </div>

        <div className="mt-3 flex flex-col gap-2.5 sm:flex-row">
          <QuantityStepper
            value={quantity}
            onChange={setQuantity}
            max={maxQuantity}
            className="w-fit"
          />
          <button
            type="button"
            onClick={handleAddToBag}
            disabled={!product.inStock}
            className="group flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-primary px-6 text-[13px] font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/85 active:scale-[0.995] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ShoppingBag className="size-4" />
            {product.inStock ? "Add to bag" : "Sold out"}
          </button>
          <button
            type="button"
            onClick={handleWishlist}
            aria-label={
              saved
                ? `Remove ${product.name} from wishlist`
                : `Save ${product.name} to wishlist`
            }
            aria-pressed={saved}
            className={cn(
              "flex h-12 w-full items-center justify-center gap-2 rounded-full border text-[13px] font-medium transition-colors sm:w-12 sm:px-0",
              saved
                ? "border-brand/40 bg-brand/5 text-brand"
                : "border-border text-foreground hover:bg-muted"
            )}
          >
            <Heart className={cn("size-4", saved && "fill-current")} />
            <span className="sm:hidden">
              {saved ? "Saved" : "Save for later"}
            </span>
          </button>
        </div>
      </div>

      <div className="mt-5 flex items-start gap-2.5 rounded-xl bg-sand/70 px-4 py-3 text-[11.5px] leading-relaxed text-muted-foreground">
        <Truck className="mt-0.5 size-3.5 shrink-0" />
        <p>
          Complimentary shipping over ৳5,000. Orders placed before 2pm ship the
          same day from Dhaka.
        </p>
      </div>
    </div>
  );
}
