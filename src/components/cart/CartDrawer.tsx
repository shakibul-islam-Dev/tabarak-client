"use client";

import Link from "next/link";
import { ArrowRight, ShoppingBag } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CartItemRow } from "@/components/cart/CartItem";
import {
  FREE_SHIPPING_THRESHOLD,
  selectCartSubtotal,
  useCartStore,
} from "@/store/cart";
import { useUiStore } from "@/store/ui";
import { formatPrice } from "@/lib/format";

export function CartDrawer() {
  const open = useUiStore((state) => state.cartOpen);
  const setOpen = useUiStore((state) => state.setCartOpen);
  const close = useUiStore((state) => state.closeCart);

  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore(selectCartSubtotal);

  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="w-[min(440px,92vw)] max-w-[440px] p-0"
        closeLabel="Close bag"
      >
        <div data-lenis-prevent className="flex h-full flex-col">
          <SheetHeader className="border-b border-border px-6 py-5">
            <SheetTitle className="text-[22px]">
              Your bag
              <span className="ml-2 align-middle text-sm font-normal text-muted-foreground">
                ({items.reduce((total, item) => total + item.quantity, 0)})
              </span>
            </SheetTitle>
            <SheetDescription className="text-xs">
              Pieces are reserved for 60 minutes.
            </SheetDescription>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
              <div className="flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <ShoppingBag className="size-6" />
              </div>
              <h3 className="mt-6 font-display text-2xl">Your bag is empty</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                A quiet wardrobe starts with one good piece. Explore the
                collection and find yours.
              </p>
              <Button asChild className="mt-7" onClick={close}>
                <Link href="/shop">
                  Continue shopping
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto px-6">
                <div className="border-b border-border py-4">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-muted-foreground">
                      {remaining > 0
                        ? `You're ${formatPrice(remaining)} away from complimentary shipping`
                        : "Complimentary shipping unlocked"}
                    </span>
                    <span className="tabular-nums text-muted-foreground">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div
                    className="mt-2 h-1 overflow-hidden rounded-full bg-muted"
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

                <ul className="divide-y divide-border">
                  {items.map((item) => (
                    <li key={item.key}>
                      <CartItemRow item={item} compact onNavigate={close} />
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-border bg-card px-6 py-5">
                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-medium">Subtotal</span>
                  <span className="font-display text-xl tabular-nums">
                    {formatPrice(subtotal)}
                  </span>
                </div>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Shipping and taxes calculated at checkout.
                </p>

                <div className="mt-5 flex flex-col gap-2">
                  <Button asChild size="lg" onClick={close}>
                    <Link href="/checkout">
                      Checkout
                      <ArrowRight className="size-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" onClick={close}>
                    <Link href="/cart">View bag</Link>
                  </Button>
                </div>

                <p className="mt-4 text-center text-[10px] tracking-[0.12em] text-muted-foreground uppercase">
                  Secure checkout · bKash · Cards · Cash on delivery
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
