"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type RegistrationValues = {
  name: string;
  email: string;
  password: string;
};

export function RegistrationForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationValues>({
    defaultValues: { name: "", email: "", password: "" },
    mode: "onTouched",
  });

  const password = useWatch({ control, name: "password", defaultValue: "" });
  const passwordChecks = [
    { label: "8 characters", met: password.length >= 8 },
    { label: "One number", met: /\d/.test(password) },
    { label: "One letter", met: /[a-zA-Z]/.test(password) },
  ];

  const onSubmit = async (values: RegistrationValues) => {
    setFormError(null);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Unable to create your account.");
      }

      toast.success("Account created", {
        description: "Welcome to Tabark.",
      });
      router.push("/account");
      router.refresh();
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Unable to create your account."
      );
    }
  };

  return (
    <div>
      <p className="eyebrow">Account</p>
      <h1 className="mt-3 font-display text-[clamp(2rem,4vw,2.75rem)] leading-[1.02] font-light tracking-[-0.025em]">
        Join us.
      </h1>
      <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
        Create an account to keep your wishlist and order history in one place.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-8 space-y-4">
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

        <div>
          <Label htmlFor="password" className="mb-1.5">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Create a password"
              className="pr-12"
              aria-invalid={Boolean(errors.password)}
              {...register("password", {
                required: "Password is required.",
                minLength: {
                  value: 8,
                  message: "At least 8 characters.",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword((current) => !current)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-4 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {errors.password ? (
            <p role="alert" className="mt-1.5 text-[11px] text-destructive">
              {errors.password.message}
            </p>
          ) : (
            <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[10.5px] text-muted-foreground">
              {passwordChecks.map((check) => (
                <li
                  key={check.label}
                  className={
                    check.met ? "text-brand" : "text-muted-foreground/70"
                  }
                >
                  {check.met ? "✓" : "○"} {check.label}
                </li>
              ))}
            </ul>
          )}
        </div>

        {formError ? (
          <p
            role="alert"
            className="rounded-xl border border-destructive/25 bg-destructive/5 px-4 py-3 text-[12px] text-destructive"
          >
            {formError}
          </p>
        ) : null}

        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Creating account…
            </>
          ) : (
            "Create account"
          )}
        </Button>

        <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
          By creating an account you agree to our{" "}
          <Link href="/terms" className="underline underline-offset-4">
            terms
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="underline underline-offset-4">
            privacy policy
          </Link>
          .
        </p>
      </form>

      <div className="mt-8 border-t border-border pt-6 text-center">
        <p className="text-[12px] text-muted-foreground">
          Already have an account?
        </p>
        <Button asChild variant="outline" className="mt-3 w-full">
          <Link href="/login">Sign in</Link>
        </Button>
      </div>
    </div>
  );
}
