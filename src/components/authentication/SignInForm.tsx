"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

type SignInValues = {
  email: string;
  password: string;
};

export function SignInForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const onSubmit = async (values: SignInValues) => {
    setFormError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Unable to sign in.");
      }

      toast.success("Welcome back");
      router.push("/account");
      router.refresh();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to sign in.";
      setFormError(message);
    }
  };

  return (
    <div>
      <p className="eyebrow">Account</p>
      <h1 className="mt-3 font-display text-[clamp(2rem,4vw,2.75rem)] leading-[1.02] font-light tracking-[-0.025em]">
        Welcome back.
      </h1>
      <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
        Sign in to see your wishlist, orders and saved details.
      </p>

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

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <Link
              href="/forgot-password"
              className="text-[11px] text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground"
            >
              Forgot?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Your password"
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

        <Button type="submit" size="lg" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Signing in…
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>

      <div className="mt-8 border-t border-border pt-6 text-center">
        <p className="text-[12px] text-muted-foreground">
          New to Tabark?
        </p>
        <Button asChild variant="outline" className="mt-3 w-full">
          <Link href="/registration">Create an account</Link>
        </Button>
      </div>
    </div>
  );
}
