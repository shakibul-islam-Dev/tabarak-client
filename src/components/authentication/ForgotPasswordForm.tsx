"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type ForgotValues = { email: string };

export function ForgotPasswordForm() {
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotValues>({
    defaultValues: { email: "" },
    mode: "onTouched",
  });

  const onSubmit = async (values: ForgotValues) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    setSubmittedEmail(values.email);
  };

  return (
    <div>
      <p className="eyebrow">Account</p>
      <h1 className="mt-3 font-display text-[clamp(2rem,4vw,2.75rem)] leading-[1.02] font-light tracking-[-0.025em]">
        Reset your password.
      </h1>
      <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
        Enter the email on your account and we&apos;ll help you get back in.
      </p>

      {submittedEmail ? (
        <div className="mt-8 rounded-2xl border border-border bg-card p-5">
          <Mail className="size-5 text-brand" />
          <p className="mt-3 text-[13px] leading-relaxed">
            Thanks — we&apos;ve noted{" "}
            <span className="font-medium">{submittedEmail}</span>.
          </p>
          <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
            Automated password resets aren&apos;t connected in this preview
            build. Write to{" "}
            <a
              href="mailto:hello@tabark.com?subject=Password%20reset"
              className="underline underline-offset-4"
            >
              hello@tabark.com
            </a>{" "}
            and we&apos;ll reset it by hand within one working day.
          </p>
          <Button asChild variant="outline" className="mt-5 w-full">
            <Link href="/login">Back to sign in</Link>
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-4">
          <div>
            <Label htmlFor="email" className="mb-1.5">
              Email
            </Label>
            <Input
              id="email"
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

          <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Sending…
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </form>
      )}

      <Link
        href="/login"
        className="mt-8 inline-flex items-center gap-2 text-[12px] text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Back to sign in
      </Link>
    </div>
  );
}
