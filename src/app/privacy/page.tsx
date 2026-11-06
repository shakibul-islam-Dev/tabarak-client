import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "How Tabark collects, uses and protects your information.",
};

const sections = [
  {
    title: "What we collect",
    body: "When you create an account we store your name and email address. When you place an order we collect your delivery address and phone number. If you subscribe, we store your email address for the newsletter. This preview build keeps your cart and wishlist in your browser's local storage, not on a server.",
  },
  {
    title: "How we use it",
    body: "Your details are used to fulfil orders, reply to messages and — only if you ask us to — send occasional newsletters. We do not sell, rent or share your personal information with advertisers.",
  },
  {
    title: "Cookies & local storage",
    body: "We use a small, HTTP-only session cookie to keep you signed in, and local storage to remember your cart and wishlist between visits. No third-party advertising cookies are used.",
  },
  {
    title: "Payments",
    body: "Payments are processed by PCI-compliant providers. Tabark never sees or stores full card numbers. Details of the payment methods available are shown at checkout.",
  },
  {
    title: "Your rights",
    body: "You can request a copy of your data, correct it, or ask us to delete your account at any time by writing to hello@tabark.com. We'll respond within 30 days.",
  },
  {
    title: "Contact",
    body: "Questions about this policy can be sent to hello@tabark.com or posted to House 12, Road 7, Sector 4, Uttara, Dhaka 1230, Bangladesh.",
  },
];

export default function PrivacyPage() {
  return (
    <section className="shell max-w-3xl py-14 lg:py-20">
      <p className="eyebrow mb-4">Legal</p>
      <h1 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1] font-light tracking-[-0.025em]">
        Privacy policy
      </h1>
      <p className="mt-4 text-[12px] tracking-[0.1em] text-muted-foreground uppercase">
        Last updated — November 2026
      </p>
      <p className="mt-8 text-[14px] leading-relaxed text-muted-foreground">
        Tabark is a small, independent studio. We collect as little as we can,
        keep it safe, and only use it to do the things you&apos;ve asked us to
        do.
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
