"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type NewsletterValues = {
  email: string;
};

export function Newsletter() {
  const [subscribed, setSubscribed] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({
    defaultValues: { email: "" },
    mode: "onTouched",
  });

  const onSubmit = async (values: NewsletterValues) => {
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Something went wrong.");
      }

      setSubscribed(true);
      reset();
      toast.success("You're on the list", {
        description: "Look out for a quiet note from us soon.",
      });
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong."
      );
    }
  };

  return (
    <section id="newsletter" className="section bg-sand">
      <div className="shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow mb-4">Newsletter</p>
          <h2 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.02] font-light tracking-[-0.025em]">
            Letters from Tabark.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
            New arrivals, notes from the studio, and the occasional invitation.
            Sent rarely, and never without something worth saying.
          </p>

          {subscribed ? (
            <div
              role="status"
              className="mx-auto mt-9 flex max-w-md items-center justify-center gap-3 rounded-full border border-brand/30 bg-brand/10 px-6 py-4 text-sm text-brand"
            >
              <span className="flex size-6 items-center justify-center rounded-full bg-brand text-brand-foreground">
                <Check className="size-3.5" />
              </span>
              You&apos;re subscribed. Welcome in.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="mx-auto mt-9 max-w-md"
            >
              <div className="flex flex-col gap-2 sm:flex-row">
                <div className="flex-1">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    autoComplete="email"
                    placeholder="Your email address"
                    aria-invalid={errors.email ? "true" : "false"}
                    aria-describedby={
                      errors.email ? "newsletter-error" : undefined
                    }
                    className="h-12 w-full rounded-full border border-border bg-background px-5 text-sm transition-colors placeholder:text-muted-foreground/70 focus-visible:border-foreground/40 focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none aria-invalid:border-destructive"
                    {...register("email", {
                      required: "Please enter your email address.",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Please enter a valid email address.",
                      },
                    })}
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="group h-12 shrink-0"
                >
                  {isSubmitting ? "Joining…" : "Join the list"}
                  {!isSubmitting ? (
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                  ) : null}
                </Button>
              </div>

              {errors.email ? (
                <p
                  id="newsletter-error"
                  role="alert"
                  className="mt-2 text-left text-xs text-destructive sm:pl-5"
                >
                  {errors.email.message}
                </p>
              ) : (
                <p className="mt-3 text-[11px] text-muted-foreground">
                  By subscribing you agree to our privacy policy. Unsubscribe at
                  any time.
                </p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
