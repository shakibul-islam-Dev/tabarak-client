import { RefreshCcw, ShieldCheck, Truck, Wrench } from "lucide-react";

const items = [
  {
    icon: Truck,
    title: "Nationwide delivery",
    copy: "Dhaka in 1–2 days, everywhere else in 3–5.",
  },
  {
    icon: RefreshCcw,
    title: "14-day returns",
    copy: "Changed your mind? Return it, no questions.",
  },
  {
    icon: ShieldCheck,
    title: "Secure checkout",
    copy: "bKash, cards and cash on delivery.",
  },
  {
    icon: Wrench,
    title: "Free repairs",
    copy: "For the life of every piece we make.",
  },
];

export function Assurance() {
  return (
    <section aria-label="Service promises" className="border-b border-border">
      <div className="shell grid grid-cols-2 gap-x-6 gap-y-8 py-10 lg:grid-cols-4 lg:py-12">
        {items.map((item) => (
          <div key={item.title} className="flex items-start gap-3">
            <item.icon className="mt-0.5 size-[18px] shrink-0 text-brand" />
            <div>
              <p className="text-[12.5px] font-medium">{item.title}</p>
              <p className="mt-1 text-[11.5px] leading-relaxed text-muted-foreground">
                {item.copy}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
