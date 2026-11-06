import type { Metadata } from "next";
import Link from "next/link";
import {
  Clock,
  Mail,
  MapPin,
  Phone,
  ChevronDown,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaPinterestP } from "react-icons/fa6";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/shared/Reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the Tabark team about orders, returns, repairs, sizing or anything else.",
};

const faqs = [
  {
    id: "shipping",
    question: "Shipping & delivery",
    answer:
      "Orders over ৳5,000 ship free across Bangladesh. Below that, standard delivery is ৳150. Dhaka orders arrive in 1–2 working days; everywhere else in 3–5. Express delivery (1–2 days) is available at checkout for ৳350.",
  },
  {
    id: "returns",
    question: "Returns & exchanges",
    answer:
      "You have 14 days from delivery to return or exchange anything unworn, with tags attached. Start a return from your account or email hello@tabark.com and we'll arrange a pickup in Dhaka. Returns are free; exchanges ship back at no cost.",
  },
  {
    id: "sizes",
    question: "Size guide",
    answer:
      "Our apparel runs relaxed. Shirts and tees are true to size with a dropped shoulder; if you're between sizes, take the smaller one for a cleaner fit. Footwear is unisex EU sizing and fits true to size. Still unsure? Write to us with your measurements and we'll advise.",
  },
  {
    id: "care",
    question: "Care guide",
    answer:
      "Wash natural fibres cold and line dry where possible. Store leather in the dust bag provided and condition it twice a year. Ceramics are hand wash only. Each product page carries the specific care instructions for that piece.",
  },
  {
    id: "repairs",
    question: "Repairs",
    answer:
      "Every Tabark piece comes with complimentary repairs for life — from a loose button to a worn sole. Bring it to the Uttara studio or send it to us and we'll take care of the rest.",
  },
  {
    id: "track",
    question: "Track your order",
    answer:
      "Once your order ships you'll receive a tracking link by email and SMS. You can also sign in to your account to see order status. If a tracking update looks stuck, write to hello@tabark.com with your order number.",
  },
  {
    id: "payments",
    question: "Payments",
    answer:
      "We accept bKash, Nagad, Visa, Mastercard and cash on delivery within Dhaka. All card payments are processed by a PCI-compliant provider; we never store card details.",
  },
];

const socials = [
  { name: "Instagram", href: "https://instagram.com", icon: FaInstagram },
  { name: "Pinterest", href: "https://pinterest.com", icon: FaPinterestP },
  { name: "Facebook", href: "https://facebook.com", icon: FaFacebookF },
];

export default function ContactPage() {
  return (
    <>
      <section className="shell pt-12 pb-10 sm:pt-16 lg:pt-20">
        <div className="max-w-2xl">
          <p className="eyebrow mb-4">Contact</p>
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] leading-[0.98] font-light tracking-[-0.03em]">
            Talk to us.
          </h1>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
            A real person reads every message. Questions about an order, a
            repair, sizing or wholesale — we&apos;re here.
          </p>
        </div>
      </section>

      <section className="shell pb-16 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <Reveal>
            <div className="space-y-7">
              <div>
                <p className="eyebrow mb-3">Email</p>
                <a
                  href="mailto:hello@tabark.com"
                  className="link-underline inline-flex items-center gap-2 text-[15px] font-medium"
                >
                  <Mail className="size-4 text-brand" />
                  hello@tabark.com
                </a>
              </div>

              <div>
                <p className="eyebrow mb-3">Phone</p>
                <a
                  href="tel:+8801700000000"
                  className="link-underline inline-flex items-center gap-2 text-[15px] font-medium"
                >
                  <Phone className="size-4 text-brand" />
                  +880 1700 000000
                </a>
              </div>

              <div>
                <p className="eyebrow mb-3">Studio</p>
                <p className="flex items-start gap-2 text-[14px] leading-relaxed">
                  <MapPin className="mt-0.5 size-4 shrink-0 text-brand" />
                  House 12, Road 7, Sector 4
                  <br />
                  Uttara, Dhaka 1230
                  <br />
                  Bangladesh
                </p>
              </div>

              <div>
                <p className="eyebrow mb-3">Opening hours</p>
                <p className="flex items-start gap-2 text-[14px] leading-relaxed">
                  <Clock className="mt-0.5 size-4 shrink-0 text-brand" />
                  Sunday – Thursday, 10am – 7pm
                  <br />
                  Friday & Saturday by appointment
                </p>
              </div>

              <div>
                <p className="eyebrow mb-3">Follow along</p>
                <div className="flex items-center gap-2">
                  {socials.map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={social.name}
                      className="flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground/30 hover:text-foreground"
                    >
                      <social.icon className="size-3.5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
              <h2 className="font-display text-2xl font-light">
                Send a note
              </h2>
              <p className="mt-2 text-[12.5px] text-muted-foreground">
                We reply within one working day.
              </p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-border bg-sand/40">
        <div className="shell section">
          <div className="grid gap-10 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
            <div>
              <p className="eyebrow mb-3">Help</p>
              <h2 className="font-display text-3xl font-light tracking-[-0.02em] sm:text-4xl">
                Answers,
                <br />
                quickly.
              </h2>
              <p className="mt-4 max-w-xs text-[13px] leading-relaxed text-muted-foreground">
                The things people ask most. If yours isn&apos;t here, the form
                above reaches a real person.
              </p>
            </div>

            <div className="divide-y divide-border border-y border-border">
              {faqs.map((faq) => (
                <details key={faq.id} id={faq.id} className="group scroll-mt-28">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[13.5px] font-medium transition-colors hover:text-brand [&::-webkit-details-marker]:hidden">
                    {faq.question}
                    <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
                  </summary>
                  <p className="pb-5 text-[13px] leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border">
        <div className="shell flex flex-col items-center justify-between gap-4 py-8 text-[11px] text-muted-foreground sm:flex-row">
          <p>
            Prefer to write?{" "}
            <a
              href="mailto:hello@tabark.com"
              className="underline underline-offset-4"
            >
              hello@tabark.com
            </a>
          </p>
          <div className="flex items-center gap-5">
            <Link href="/privacy" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
