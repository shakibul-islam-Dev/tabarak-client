"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/format";
import { useHydrated } from "@/hooks/use-hydrated";
import {
  FREE_SHIPPING_THRESHOLD,
  selectCartSubtotal,
  useCartStore,
} from "@/store/cart";
import { CartItemRow } from "@/components/cart/CartItem";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

const FLAT_SHIPPING = 150;

export function CartView() {
  const hydrated = useHydrated();
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore(selectCartSubtotal);
  const clearCart = useCartStore((state) => state.clearCart);

  const count = items.reduce((total, item) => total + item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FLAT_SHIPPING;
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  if (!hydrated) {
    return (
      <div className="shell py-12 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="flex gap-4 border-b border-border pb-6">
                <div className="size-24 animate-pulse rounded-xl bg-muted" />
                <div className="flex-1 space-y-3 py-2">
                  <div className="h-3 w-1/2 animate-pulse rounded-full bg-muted" />
                  <div className="h-3 w-1/4 animate-pulse rounded-full bg-muted" />
                </div>
              </div>
            ))}
          </div>
          <div className="h-64 animate-pulse rounded-2xl bg-muted" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="shell py-14 lg:py-20">
        <EmptyState
          icon={<ShoppingBag className="size-6" />}
          title="Your bag is empty"
          description="Nothing in here yet. Explore the collection and find a piece worth keeping."
          action={
            <Button asChild>
              <Link href="/shop">
                Shop the collection
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="shell py-10 lg:py-14">
      <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-14">
        <div>
          <div className="flex items-end justify-between border-b border-border pb-4">
            <h1 className="font-display text-3xl font-light tracking-[-0.02em] sm:text-4xl">
              Your bag
              <span className="ml-2 align-middle text-sm font-normal text-muted-foreground">
                ({count})
              </span>
            </h1>
            <button
              type="button"
              onClick={clearCart}
              className="text-[11px] text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Clear bag
            </button>
          </div>

          <ul className="divide-y divide-border">
            {items.map((item) => (
              <li key={item.key}>
                <CartItemRow item={item} />
              </li>
            ))}
          </ul>

          <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl bg-sand/70 px-5 py-4">
            <div className="text-[12px] leading-relaxed text-muted-foreground">
              {remaining > 0 ? (
                <>
                  Add <span className="font-medium text-foreground">{formatPrice(remaining)}</span>{" "}
                  more for complimentary shipping.
                </>
              ) : (
                <>Complimentary shipping unlocked — nice.</>
              )}
            </div>
            <div
              className="h-1.5 w-24 shrink-0 overflow-hidden rounded-full bg-border"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
              aria-label="Progress towards complimentary shipping"
            >
              <div
                className="h-full rounded-full bg-brand transition-[width] duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <Link
            href="/shop"
            className="group mt-8 inline-flex items-center gap-2 text-[12px] font-medium tracking-[0.08em] uppercase"
          >
            <span className="link-underline pb-0.5">Continue shopping</span>
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-xl">Order summary</h2>

            <dl className="mt-5 space-y-3 text-[13px]">
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="tabular-nums">
                  {shipping === 0 ? "Complimentary" : formatPrice(shipping)}
                </dd>
              </div>
              <div className="flex items-center justify-between border-t border-border pt-3 text-base font-medium">
                <dt>Total</dt>
                <dd className="font-display text-xl tabular-nums">
                  {formatPrice(subtotal + shipping)}
                </dd>
              </div>
            </dl>

            <Button asChild size="lg" className="mt-6 w-full">
              <Link href="/checkout">
                Checkout
                <ArrowRight className="size-4" />
              </Link>
            </Button>

            <p className="mt-4 text-center text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
              Secure checkout · bKash · Cards · COD
            </p>

            <div className="mt-6 space-y-2 border-t border-border pt-5 text-[11.5px] text-muted-foreground">
              <p className="flex justify-between">
                <span>Returns</span>
                <span>14 days, free</span>
              </p>
              <p className="flex justify-between">
                <span>Repairs</span>
                <span>Complimentary, for life</span>
              </p>
              <p className="flex justify-between">
                <span>Need help?</span>
                <a
                  href="mailto:hello@tabark.com"
                  className="underline underline-offset-4"
                >
                  hello@tabark.com
                </a>
              </p>
            </div>
          </div>

          <p className="mt-4 px-2 text-center text-[11px] leading-relaxed text-muted-foreground">
            Taxes are included. Shipping is calculated at checkout.
          </p>
        </aside>
      </div>
    </div>
  );
}
