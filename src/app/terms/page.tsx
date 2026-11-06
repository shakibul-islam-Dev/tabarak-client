import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of service",
  description: "The terms that apply when you shop with Tabark.",
};

const sections = [
  {
    title: "Orders & acceptance",
    body: "An order is a request to buy. We accept it when we confirm dispatch by email. If an item turns out to be unavailable or priced in error, we'll contact you before charging anything and offer a full refund or an alternative.",
  },
  {
    title: "Pricing",
    body: "All prices are shown in Bangladeshi Taka (৳) and include applicable taxes. Shipping is calculated at checkout. We may change prices, but never after an order has been accepted.",
  },
  {
    title: "Shipping",
    body: "Orders over ৳5,000 ship free nationwide. Standard delivery takes 3–5 working days, express 1–2. Estimates are not guarantees, but if something is badly delayed we'll make it right.",
  },
  {
    title: "Returns & exchanges",
    body: "Unworn items with tags attached can be returned within 14 days of delivery. Returns are free within Dhaka. Exchanges ship back at no extra cost. Made-to-order and engraved pieces are final sale unless faulty.",
  },
  {
    title: "Repairs",
    body: "Every Tabark piece is eligible for complimentary repairs for its lifetime. Repairs cover construction and hardware; damage from misuse or normal heavy wear may be quoted before work begins.",
  },
  {
    title: "Accounts",
    body: "You are responsible for keeping your password secure. Tell us immediately if you believe your account has been used without permission. We may suspend accounts used for fraudulent or abusive activity.",
  },
  {
    title: "Intellectual property",
    body: "All designs, photography and text on this site belong to Tabark. Please don't reproduce them commercially without written permission.",
  },
  {
    title: "Contact",
    body: "Questions about these terms can be sent to hello@tabark.com or posted to House 12, Road 7, Sector 4, Uttara, Dhaka 1230, Bangladesh.",
  },
];

export default function TermsPage() {
  return (
    <section className="shell max-w-3xl py-14 lg:py-20">
      <p className="eyebrow mb-4">Legal</p>
      <h1 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1] font-light tracking-[-0.025em]">
        Terms of service
      </h1>
      <p className="mt-4 text-[12px] tracking-[0.1em] text-muted-foreground uppercase">
        Last updated — November 2026
      </p>
      <p className="mt-8 text-[14px] leading-relaxed text-muted-foreground">
        These terms apply whenever you browse or buy from Tabark. We&apos;ve
        kept them short and readable on purpose.
      </p>

      <div className="mt-10 divide-y divide-border border-y border-border">
        {sections.map((section) => (
          <div key={section.title} className="py-6">
            <h2 className="text-[13px] font-medium tracking-[0.08em] uppercase">
              {section.title}
            </h2>
            <p className="mt-3 text-[13.5px] leading-relaxed text-muted-foreground">
              {section.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
