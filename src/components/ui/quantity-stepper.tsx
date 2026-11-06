"use client";

import { Minus, Plus } from "lucide-react";
import { cn } from "cn";

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
  label?: string;
};

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 10,
  className,
  label = "Quantity",
}: QuantityStepperProps) {
  return (
    <div
      className={cn(
        "inline-flex h-12 items-center rounded-full border border-border",
        className
      )}
      role="group"
      aria-label={label}
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        className="flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-35"
      >
        <Minus className="size-3.5" />
      </button>
      <span
        aria-live="polite"
        className="w-8 text-center text-sm font-medium tabular-nums"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        className="flex size-11 items-center justify-center rounded-full text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-35"
      >
        <Plus className="size-3.5" />
      </button>
    </div>
  );
}
