"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import type { CategorySlug, SortOption } from "@/types";
import { categories, products } from "@/data/products";
import { ProductFilters } from "@/components/products/ProductFilters";
import { ProductGrid } from "@/components/products/ProductGrid";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

type ShopBrowserProps = {
  initialCategory: string;
  initialQuery: string;
};

export function ShopBrowser({
  initialCategory,
  initialQuery,
}: ShopBrowserProps) {
  const [category, setCategory] = useState<CategorySlug | "all">(() =>
    categories.some((item) => item.slug === initialCategory)
      ? (initialCategory as CategorySlug)
      : "all"
  );
  const [query, setQuery] = useState(initialQuery);
  const [sort, setSort] = useState<SortOption>("featured");

  const updateFilters = (
    nextCategory: CategorySlug | "all",
    nextQuery: string
  ) => {
    setCategory(nextCategory);
    setQuery(nextQuery);

    const params = new URLSearchParams();
    if (nextCategory !== "all") params.set("category", nextCategory);
    const trimmed = nextQuery.trim();
    if (trimmed) params.set("q", trimmed);

    const suffix = params.toString();
    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${suffix ? `?${suffix}` : ""}`
    );
  };

  const handleCategoryChange = (next: CategorySlug | "all") => {
    updateFilters(next, query);
  };

  const handleClearQuery = () => {
    updateFilters(category, "");
  };

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    const result = products.filter((product) => {
      const matchesCategory =
        category === "all" || product.category === category;
      const matchesQuery =
        !normalized ||
        [
          product.name,
          product.category,
          product.description,
          product.material,
          ...product.collections,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalized);

      return matchesCategory && matchesQuery;
    });

    switch (sort) {
      case "newest":
        return [...result].sort(
          (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
        );
      case "price-asc":
        return [...result].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...result].sort((a, b) => b.price - a.price);
      case "name-asc":
        return [...result].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return [...result].sort(
          (a, b) => Number(b.featured) - Number(a.featured)
        );
    }
  }, [category, query, sort]);

  return (
    <>
      <ProductFilters
        categories={categories}
        category={category}
        onCategoryChange={handleCategoryChange}
        sort={sort}
        onSortChange={setSort}
        query={query}
        onClearQuery={handleClearQuery}
        count={filtered.length}
      />

      <div className="shell py-10 lg:py-14">
        {filtered.length > 0 ? (
          <>
            <div className="mb-6 flex items-baseline justify-between">
              <p className="text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
                {filtered.length} {filtered.length === 1 ? "piece" : "pieces"}
              </p>
              <p className="text-[11px] text-muted-foreground capitalize">
                {category === "all" ? "All categories" : category}
              </p>
            </div>
            <ProductGrid products={filtered} priorityCount={4} />
          </>
        ) : (
          <EmptyState
            icon={<SearchX className="size-6" />}
            title="Nothing matches — yet"
            description="Try a broader category, or clear your search to see the full collection."
            action={
              <Button variant="outline" onClick={() => updateFilters("all", "")}>
                Clear filters
              </Button>
            }
          />
        )}
      </div>
    </>
  );
}
