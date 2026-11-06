import type { ReactNode } from "react";
import { cn } from "cn";

type EmptyStateProps = {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-card/60 px-6 py-16 text-center sm:py-20",
        className
      )}
    >
      {icon ? (
        <div className="mb-5 flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
          {icon}
        </div>
      ) : null}
      <h2 className="font-display text-2xl font-normal">{title}</h2>
      {description ? (
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
      {action ? <div className="mt-7">{action}</div> : null}
    </div>
  );
}
