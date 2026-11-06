import type { Metadata } from "next";
import { WishlistView } from "@/components/products/WishlistView";

export const metadata: Metadata = {
  title: "Wishlist",
  description: "Pieces you've saved from the Tabark collection.",
};

export default function WishlistPage() {
  return (
    <section className="pt-8 sm:pt-10">
      <WishlistView />
    </section>
  );
}
