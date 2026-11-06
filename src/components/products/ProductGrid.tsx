import { cn } from "cn";
import type { Product } from "@/types";
import { ProductCard } from "@/components/products/ProductCard";

type ProductGridProps = {
  products: Product[];
  className?: string;
  priorityCount?: number;
};

export function ProductGrid({
  products,
  className,
  priorityCount = 0,
}: ProductGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-9 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-3 xl:grid-cols-4",
        className
      )}
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={index < priorityCount}
        />
      ))}
    </div>
  );
}
