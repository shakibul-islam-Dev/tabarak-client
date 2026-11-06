"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type ContactValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const subjects = [
  "General enquiry",
  "Order support",
  "Returns & repairs",
  "Wholesale & press",
  "Something else",
];

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactValues>({
    mode: "onTouched",
    defaultValues: {
      name: "",
      email: "",
      subject: subjects[0],
      message: "",
    },
  });

  const onSubmit = async (values: ContactValues) => {
    setFormError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "We couldn't send your message.");
      }

      setSent(true);
      reset();
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "We couldn't send your message."
      );
    }
  };

  if (sent) {
    return (
      <div
        role="status"
        className="flex h-full flex-col items-start justify-center rounded-2xl border border-brand/25 bg-brand/5 p-7 sm:p-9"
      >
        <span className="flex size-12 items-center justify-center rounded-full bg-brand text-brand-foreground">
          <Check className="size-5" />
        </span>
        <h2 className="mt-5 font-display text-3xl font-light">
          Message received.
        </h2>
        <p className="mt-2 max-w-sm text-[13px] leading-relaxed text-muted-foreground">
          Thank you for writing. We reply within one working day — usually
          sooner.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setSent(false)}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name" className="mb-1.5">
            Name
          </Label>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            {...register("name", {
              required: "Name is required.",
              minLength: { value: 2, message: "At least 2 characters." },
            })}
          />
          {errors.name ? (
            <p role="alert" className="mt-1.5 text-[11px] text-destructive">
              {errors.name.message}
            </p>
          ) : null}
        </div>

        <div>
          <Label htmlFor="contact-email" className="mb-1.5">
            Email
          </Label>
          <Input
            id="contact-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Enter a valid email address.",
              },
            })}
          />
          {errors.email ? (
            <p role="alert" className="mt-1.5 text-[11px] text-destructive">
              {errors.email.message}
            </p>
          ) : null}
        </div>
      </div>

      <div>
        <Label htmlFor="subject" className="mb-1.5">
          Subject
        </Label>
        <select
          id="subject"
          className="h-12 w-full rounded-xl border border-input bg-background px-4 text-sm focus-visible:border-foreground/40 focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
          {...register("subject")}
        >
          {subjects.map((subject) => (
            <option key={subject}>{subject}</option>
          ))}
        </select>
      </div>

      <div>
        <Label htmlFor="message" className="mb-1.5">
          Message
        </Label>
        <textarea
          id="message"
          rows={6}
          placeholder="Tell us what's on your mind…"
          aria-invalid={Boolean(errors.message)}
          className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground/70 focus-visible:border-foreground/40 focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
          {...register("message", {
            required: "Message is required.",
            minLength: { value: 10, message: "At least 10 characters." },
          })}
        />
        {errors.message ? (
          <p role="alert" className="mt-1.5 text-[11px] text-destructive">
            {errors.message.message}
          </p>
        ) : null}
      </div>

      {formError ? (
        <p
          role="alert"
          className="rounded-xl border border-destructive/25 bg-destructive/5 px-4 py-3 text-[12px] text-destructive"
        >
          {formError}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={isSubmitting} className="w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Sending…
          </>
        ) : (
          <>
            Send message
            <ArrowRight className="size-4" />
          </>
        )}
      </Button>

      <p className="text-[11px] text-muted-foreground">
        We only use your details to reply. Nothing is shared.
      </p>
    </form>
  );
}
