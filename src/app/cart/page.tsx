import type { Metadata } from "next";
import { CartView } from "@/components/cart/CartView";

export const metadata: Metadata = {
  title: "Your bag",
  description: "Review the pieces in your Tabark bag.",
};

export default function CartPage() {
  return (
    <section className="pt-6 sm:pt-8">
      <div className="shell">
        <nav
          aria-label="Breadcrumb"
          className="text-[11px] tracking-[0.1em] text-muted-foreground uppercase"
        >
          <a href="/shop" className="transition-colors hover:text-foreground">
            Shop
          </a>
          <span className="mx-2 text-border">/</span>
          <span className="text-foreground">Bag</span>
        </nav>
      </div>
      <CartView />
    </section>
  );
}
