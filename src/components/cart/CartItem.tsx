"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "cn";
import type { CartItem } from "@/types";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/store/cart";
import { QuantityStepper } from "@/components/ui/quantity-stepper";

type CartItemRowProps = {
  item: CartItem;
  compact?: boolean;
  onNavigate?: () => void;
};

export function CartItemRow({ item, compact, onNavigate }: CartItemRowProps) {
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className={cn("flex gap-4", compact ? "py-4" : "py-6")}>
      <Link
        href={`/products/${item.slug}`}
        onClick={onNavigate}
        className={cn(
          "relative shrink-0 overflow-hidden rounded-xl bg-muted",
          compact ? "size-20" : "size-24 sm:size-28"
        )}
      >
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="112px"
            className="object-cover"
          />
        ) : null}
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              href={`/products/${item.slug}`}
              onClick={onNavigate}
              className="block truncate text-[13.5px] font-medium transition-colors hover:text-brand"
            >
              {item.name}
            </Link>
            <p className="mt-1 text-[11px] tracking-wide text-muted-foreground">
              {item.color}
              {item.size && item.size !== "One size" ? ` · ${item.size}` : ""}
            </p>
          </div>
          <p className="shrink-0 text-[13px] font-medium tabular-nums">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>

        <div className="mt-auto flex items-end justify-between gap-3 pt-3">
          <QuantityStepper
            value={item.quantity}
            max={item.maxQuantity}
            onChange={(quantity) => updateQuantity(item.key, quantity)}
            className={compact ? "h-9" : "h-10"}
            label={`Quantity for ${item.name}`}
          />
          <button
            type="button"
            onClick={() => removeItem(item.key)}
            aria-label={`Remove ${item.name} from bag`}
            className="mb-1 flex items-center gap-1 text-[11px] text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
          >
            <X className="size-3" />
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
