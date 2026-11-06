"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDeferredValue, useState } from "react";
import { ArrowRight, Search } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { getNewArrivals, searchProducts } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { useUiStore } from "@/store/ui";

const suggestions = ["Oxford shirt", "Leather", "Candle", "Sneaker"];

export function SearchDialog() {
  const open = useUiStore((state) => state.searchOpen);
  const setOpen = useUiStore((state) => state.setSearchOpen);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const router = useRouter();

  const results = searchProducts(deferredQuery);
  const trending = getNewArrivals(3);

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  const handleOpenChange = (next: boolean) => {
    if (!next) setQuery("");
    setOpen(next);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    setQuery("");
    setOpen(false);
    router.push(`/shop?q=${encodeURIComponent(trimmed)}`);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="top-[8vh] max-h-[84vh] max-w-[680px] p-0">
        <DialogTitle className="sr-only">Search products</DialogTitle>
        <DialogDescription className="sr-only">
          Search the Tabark collection by product, category or material.
        </DialogDescription>

        <form
          onSubmit={handleSubmit}
          className="flex items-center gap-3 border-b border-border px-6 py-5 pr-16"
        >
          <Search className="size-5 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search the collection…"
            aria-label="Search the collection"
            className="h-9 w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground/70"
          />
        </form>

        <div data-lenis-prevent className="flex-1 overflow-y-auto px-6 py-6">
          {deferredQuery.trim() ? (
            results.length > 0 ? (
              <>
                <p className="eyebrow mb-4">
                  {results.length} result{results.length === 1 ? "" : "s"}
                </p>
                <ul className="divide-y divide-border">
                  {results.map((product) => (
                    <li key={product.id}>
                      <Link
                        href={`/products/${product.slug}`}
                        onClick={close}
                        className="group flex items-center gap-4 py-3"
                      >
                        <span className="relative size-14 shrink-0 overflow-hidden rounded-lg bg-muted">
                          <Image
                            src={product.images[0].src}
                            alt=""
                            fill
                            sizes="56px"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate text-sm font-medium">
                            {product.name}
                          </span>
                          <span className="mt-0.5 block text-[11px] capitalize text-muted-foreground">
                            {product.category}
                          </span>
                        </span>
                        <span className="text-sm tabular-nums">
                          {formatPrice(product.price)}
                        </span>
                        <ArrowRight className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    setQuery("");
                    router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
                  }}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4"
                >
                  View all results for “{query.trim()}”
                  <ArrowRight className="size-3.5" />
                </button>
              </>
            ) : (
              <div className="py-10 text-center">
                <p className="font-display text-2xl">Nothing found</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  Try a different word, or browse the full collection.
                </p>
                <Link
                  href="/shop"
                  onClick={close}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium underline underline-offset-4"
                >
                  Browse all pieces
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>
            )
          ) : (
            <>
              <p className="eyebrow mb-4">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setQuery(suggestion)}
                    className="rounded-full border border-border px-4 py-2 text-xs transition-colors hover:bg-muted"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>

              <p className="eyebrow mt-8 mb-4">Just arrived</p>
              <ul className="grid gap-4 sm:grid-cols-3">
                {trending.map((product) => (
                  <li key={product.id}>
                    <Link
                      href={`/products/${product.slug}`}
                      onClick={close}
                      className="group block"
                    >
                      <span className="relative block aspect-[4/5] overflow-hidden rounded-xl bg-muted">
                        <Image
                          src={product.images[0].src}
                          alt={product.images[0].alt}
                          fill
                          sizes="(max-width: 640px) 45vw, 200px"
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </span>
                      <span className="mt-2 block truncate text-[13px] font-medium">
                        {product.name}
                      </span>
                      <span className="text-[12px] text-muted-foreground">
                        {formatPrice(product.price)}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="flex items-center justify-between border-t border-border px-6 py-3 text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
          <span>Press esc to close</span>
          <span>Search by name, category or material</span>
        </div>
      </DialogContent>
    </Dialog>
  );
}
