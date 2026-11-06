import { ChevronDown } from "lucide-react";
import type { Product } from "@/types";

export function ProductDetails({ product }: { product: Product }) {
  const sections = [
    {
      title: "Details",
      content: (
        <ul className="space-y-2">
          {product.details.map((detail) => (
            <li key={detail} className="flex gap-2.5">
              <span className="mt-[7px] size-1 shrink-0 rounded-full bg-muted-foreground/60" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      title: "Materials & care",
      content: (
        <div className="space-y-3">
          <p>{product.material}</p>
          <p>{product.care}</p>
        </div>
      ),
    },
    {
      title: "Shipping & returns",
      content: (
        <div className="space-y-3">
          <p>
            Complimentary shipping on orders over ৳5,000. Dhaka delivery in 1–2
            working days, nationwide in 3–5.
          </p>
          <p>
            Returns accepted within 14 days of delivery, unworn and with tags
            attached. Start a return from your account or write to
            hello@tabark.com.
          </p>
        </div>
      ),
    },
    {
      title: "Made to be repaired",
      content: (
        <p>
          Every Tabark piece comes with complimentary repairs for life. Bring it
          back to the studio in Uttara, or send it to us and we&apos;ll take care
          of the rest.
        </p>
      ),
    },
  ];

  return (
    <div className="mt-9 divide-y divide-border border-y border-border">
      {sections.map((section) => (
        <details key={section.title} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between py-4 text-[12px] font-medium tracking-[0.1em] uppercase transition-colors hover:text-brand [&::-webkit-details-marker]:hidden">
            {section.title}
            <ChevronDown className="size-4 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
          </summary>
          <div className="pb-5 text-[12.5px] leading-relaxed text-muted-foreground">
            {section.content}
          </div>
        </details>
      ))}
    </div>
  );
}
