import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "cn";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  href,
  linkLabel = "View all",
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center sm:text-center",
        className
      )}
    >
      <div className={cn("max-w-xl", align === "center" && "mx-auto")}>
        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        <h2 className="font-display text-[clamp(2rem,4vw,3.25rem)] leading-[1.05] font-light tracking-[-0.02em]">
          {title}
        </h2>
        {description ? (
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>

      {href ? (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-2 text-[12px] font-medium tracking-[0.08em] uppercase"
        >
          <span className="link-underline pb-0.5">{linkLabel}</span>
          <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      ) : null}
    </div>
  );
}
