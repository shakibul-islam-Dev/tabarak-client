"use client";

import { ChevronDown, X } from "lucide-react";
import { cn } from "cn";
import type { Category, CategorySlug, SortOption } from "@/types";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name-asc", label: "Alphabetical" },
];

type ProductFiltersProps = {
  categories: Category[];
  category: CategorySlug | "all";
  onCategoryChange: (category: CategorySlug | "all") => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  query: string;
  onClearQuery: () => void;
  count: number;
};

export function ProductFilters({
  categories,
  category,
  onCategoryChange,
  sort,
  onSortChange,
  query,
  onClearQuery,
  count,
}: ProductFiltersProps) {
  return (
    <div className="sticky top-16 z-30 border-y border-border bg-background/90 backdrop-blur-xl lg:top-20">
      <div className="shell flex items-center gap-3 py-3">
        <div className="no-scrollbar -mx-1 flex flex-1 items-center gap-2 overflow-x-auto px-1">
          <FilterChip
            active={category === "all"}
            onClick={() => onCategoryChange("all")}
          >
            All
          </FilterChip>
          {categories.map((item) => (
            <FilterChip
              key={item.slug}
              active={category === item.slug}
              onClick={() => onCategoryChange(item.slug)}
            >
              {item.name}
            </FilterChip>
          ))}
        </div>

        <span className="hidden shrink-0 text-[11px] tabular-nums text-muted-foreground sm:block">
          {count} {count === 1 ? "piece" : "pieces"}
        </span>

        <div className="relative shrink-0">
          <label htmlFor="sort" className="sr-only">
            Sort products
          </label>
          <select
            id="sort"
            value={sort}
            onChange={(event) => onSortChange(event.target.value as SortOption)}
            className="h-9 cursor-pointer appearance-none rounded-full border border-border bg-background pr-9 pl-4 text-[12px] font-medium transition-colors hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:outline-none"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      {query ? (
        <div className="shell flex items-center gap-2 pb-3">
          <span className="text-[11px] text-muted-foreground">
            Results for
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-muted px-3 py-1 text-[11px] font-medium">
            “{query}”
            <button
              type="button"
              onClick={onClearQuery}
              aria-label="Clear search"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              <X className="size-3" />
            </button>
          </span>
        </div>
      ) : null}
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "h-9 shrink-0 rounded-full border px-4 text-[12px] font-medium whitespace-nowrap transition-colors",
        active
          ? "border-transparent bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:border-foreground/25 hover:text-foreground"
      )}
    >
      {children}
    </button>
  );
}
