import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa6";
import { footerNav, socialLinks } from "@/lib/navigation";

const payments = ["VISA", "Mastercard", "bKash", "Nagad", "COD"];
const YEAR = 2026;

const socialIcons = {
  Instagram: FaInstagram,
  Pinterest: FaPinterestP,
  Facebook: FaFacebookF,
} as const;

export function Footer() {
  return (
    <footer className="border-t border-border bg-sand/60">
      <div className="shell pt-16 pb-8 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          {/* Brand */}
          <div className="max-w-sm">
            <Link
              href="/"
              aria-label="Tabark — home"
              className="font-display text-3xl leading-none tracking-[-0.015em]"
            >
              Tabark<span className="text-brand">.</span>
            </Link>
            <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
              Considered clothing, leather and objects for the home. Made in
              small batches, from materials that age well — and designed to be
              kept for years.
            </p>

            <div className="mt-7">
              <p className="eyebrow mb-3">Letters, occasionally</p>
              <Link
                href="/#newsletter"
                className="group inline-flex items-center gap-2 border-b border-foreground/30 pb-1 text-sm font-medium transition-colors hover:border-foreground"
              >
                Join the list
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-2">
              {socialLinks.map((social) => {
                const Icon =
                  socialIcons[social.name as keyof typeof socialIcons];

                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    aria-label={social.name}
                    className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                  >
                    <Icon className="size-3.5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            <div>
              <p className="eyebrow mb-4">Shop</p>
              <ul className="space-y-2.5">
                {footerNav.shop.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow mb-4">Company</p>
              <ul className="space-y-2.5">
                {footerNav.company.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="eyebrow mb-4">Support</p>
              <ul className="space-y-2.5">
                {footerNav.support.map((item) => (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className="link-underline text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[11px] tracking-wide text-muted-foreground">
            © {YEAR} Tabark. All rights reserved. Made in Dhaka.
          </p>
          <ul className="flex flex-wrap items-center gap-2" aria-label="Payment methods">
            {payments.map((payment) => (
              <li
                key={payment}
                className="rounded-md border border-border bg-background/70 px-2 py-1 text-[9px] font-medium tracking-[0.08em] text-muted-foreground"
              >
                {payment}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10.5px] text-muted-foreground">
          <Link href="/privacy" className="transition-colors hover:text-foreground">
            Privacy policy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-foreground">
            Terms of service
          </Link>
          <Link href="/contact" className="transition-colors hover:text-foreground">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
