import type { Metadata } from "next";
import { CheckoutForm } from "@/components/cart/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your Tabark order.",
  robots: { index: false, follow: false },
};

export default function CheckoutPage() {
  return (
    <section className="pt-8 sm:pt-10">
      <div className="shell">
        <p className="eyebrow">Checkout</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.02] font-light tracking-[-0.025em]">
          Almost yours.
        </h1>
      </div>
      <CheckoutForm />
    </section>
  );
}
