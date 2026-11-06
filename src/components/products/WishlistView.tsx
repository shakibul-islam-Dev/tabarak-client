"use client";

import Link from "next/link";
import { ArrowRight, Heart, Trash2 } from "lucide-react";
import { useHydrated } from "@/hooks/use-hydrated";
import { products } from "@/data/products";
import { useWishlistStore } from "@/store/wishlist";
import { ProductGrid } from "@/components/products/ProductGrid";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

export function WishlistView() {
  const hydrated = useHydrated();
  const ids = useWishlistStore((state) => state.ids);
  const clear = useWishlistStore((state) => state.clear);

  const saved = products.filter((product) => ids.includes(product.id));

  if (!hydrated) {
    return (
      <div className="shell py-12">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="aspect-[4/5] animate-pulse rounded-2xl bg-muted"
            />
          ))}
        </div>
      </div>
    );
  }

  if (saved.length === 0) {
    return (
      <div className="shell py-14 lg:py-20">
        <EmptyState
          icon={<Heart className="size-6" />}
          title="No saved pieces yet"
          description="Tap the heart on anything you'd like to come back to. Saved pieces stay here across visits."
          action={
            <Button asChild>
              <Link href="/shop">
                Explore the collection
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
      <div className="mb-8 flex items-end justify-between border-b border-border pb-4">
        <div>
          <h1 className="font-display text-3xl font-light tracking-[-0.02em] sm:text-4xl">
            Wishlist
          </h1>
          <p className="mt-1 text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
            {saved.length} saved {saved.length === 1 ? "piece" : "pieces"}
          </p>
        </div>
        <button
          type="button"
          onClick={clear}
          className="inline-flex items-center gap-1.5 text-[11px] text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
        >
          <Trash2 className="size-3" />
          Clear all
        </button>
      </div>

      <ProductGrid products={saved} priorityCount={4} />
    </div>
  );
}
