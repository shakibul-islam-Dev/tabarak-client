"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useForm, useWatch, type UseFormRegisterReturn } from "react-hook-form";
import {
  ArrowLeft,
  ArrowRight,
  Info,
  Lock,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "cn";
import { formatPrice } from "@/lib/format";
import { useHydrated } from "@/hooks/use-hydrated";
import {
  FREE_SHIPPING_THRESHOLD,
  selectCartSubtotal,
  useCartStore,
} from "@/store/cart";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

type CheckoutValues = {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  apartment: string;
  city: string;
  area: string;
  postcode: string;
  country: string;
  shipping: "standard" | "express";
  payment: "bkash" | "card" | "cod";
  note: string;
};

const STANDARD_SHIPPING = 150;
const EXPRESS_SHIPPING = 350;

export function CheckoutForm() {
  const hydrated = useHydrated();
  const items = useCartStore((state) => state.items);
  const subtotal = useCartStore(selectCartSubtotal);
  const [previewNotice, setPreviewNotice] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({
    mode: "onTouched",
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      apartment: "",
      city: "",
      area: "",
      postcode: "",
      country: "Bangladesh",
      shipping: "standard",
      payment: "bkash",
      note: "",
    },
  });

  const shippingMethod = useWatch({
    control,
    name: "shipping",
    defaultValue: "standard",
  });
  const shippingCost =
    shippingMethod === "express"
      ? EXPRESS_SHIPPING
      : subtotal >= FREE_SHIPPING_THRESHOLD
        ? 0
        : STANDARD_SHIPPING;
  const total = subtotal + shippingCost;

  const onSubmit = () => {
    setPreviewNotice(true);
    toast.info("Checkout is a preview", {
      description:
        "Payments aren't connected in this build, so no order was placed and nothing was charged.",
    });
  };

  if (!hydrated) {
    return (
      <div className="shell py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
          <div className="h-96 animate-pulse rounded-2xl bg-muted" />
          <div className="h-72 animate-pulse rounded-2xl bg-muted" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="shell py-14 lg:py-20">
        <EmptyState
          title="Nothing to check out"
          description="Your bag is empty. Add a piece or two, then come back."
          action={
            <Button asChild>
              <Link href="/shop">
                Shop the collection
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="shell py-6 lg:py-10">
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 text-[11px] tracking-[0.1em] text-muted-foreground uppercase transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Back to bag
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-14">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex items-center gap-2.5 rounded-xl border border-brand/25 bg-brand/5 px-4 py-3 text-[12px] leading-relaxed text-muted-foreground">
            <Info className="size-4 shrink-0 text-brand" />
            <p>
              <span className="font-medium text-foreground">
                Preview checkout.
              </span>{" "}
              Payments aren&apos;t connected in this build — your details are
              validated but never sent anywhere.
            </p>
          </div>

          {/* Contact */}
          <section className="mt-9">
            <div className="flex items-baseline gap-3 border-b border-border pb-3">
              <span className="text-[10px] tracking-[0.16em] text-muted-foreground">
                01
              </span>
              <h2 className="text-[12px] font-medium tracking-[0.1em] uppercase">
                Contact
              </h2>
            </div>

            <div className="mt-5 grid gap-4">
              <Field label="Email" htmlFor="email" error={errors.email?.message}>
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
              </Field>

              <Field label="Phone" htmlFor="phone" error={errors.phone?.message}>
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+880 17 0000 0000"
                  aria-invalid={Boolean(errors.phone)}
                  {...register("phone", {
                    required: "Phone number is required.",
                    pattern: {
                      value: /^[+0-9][0-9\s-]{8,16}$/,
                      message: "Enter a valid phone number.",
                    },
                  })}
                />
              </Field>
            </div>
          </section>

          {/* Delivery */}
          <section className="mt-9">
            <div className="flex items-baseline gap-3 border-b border-border pb-3">
              <span className="text-[10px] tracking-[0.16em] text-muted-foreground">
                02
              </span>
              <h2 className="text-[12px] font-medium tracking-[0.1em] uppercase">
                Delivery
              </h2>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <Field
                label="First name"
                htmlFor="firstName"
                error={errors.firstName?.message}
              >
                <Input
                  id="firstName"
                  autoComplete="given-name"
                  placeholder="First name"
                  aria-invalid={Boolean(errors.firstName)}
                  {...register("firstName", {
                    required: "First name is required.",
                    minLength: { value: 2, message: "At least 2 characters." },
                  })}
                />
              </Field>

              <Field
                label="Last name"
                htmlFor="lastName"
                error={errors.lastName?.message}
              >
                <Input
                  id="lastName"
                  autoComplete="family-name"
                  placeholder="Last name"
                  aria-invalid={Boolean(errors.lastName)}
                  {...register("lastName", {
                    required: "Last name is required.",
                    minLength: { value: 2, message: "At least 2 characters." },
                  })}
                />
              </Field>

              <div className="sm:col-span-2">
                <Field
                  label="Address"
                  htmlFor="address"
                  error={errors.address?.message}
                >
                  <Input
                    id="address"
                    autoComplete="street-address"
                    placeholder="House, road, block"
                    aria-invalid={Boolean(errors.address)}
                    {...register("address", {
                      required: "Address is required.",
                      minLength: { value: 6, message: "At least 6 characters." },
                    })}
                  />
                </Field>
              </div>

              <Field
                label="Apartment, suite (optional)"
                htmlFor="apartment"
              >
                <Input
                  id="apartment"
                  autoComplete="address-line2"
                  placeholder="Apartment, floor, landmark"
                  {...register("apartment")}
                />
              </Field>

              <Field label="Area" htmlFor="area" error={errors.area?.message}>
                <Input
                  id="area"
                  autoComplete="address-level3"
                  placeholder="Uttara, Sector 7"
                  aria-invalid={Boolean(errors.area)}
                  {...register("area", {
                    required: "Area is required.",
                  })}
                />
              </Field>

              <Field label="City" htmlFor="city" error={errors.city?.message}>
                <Input
                  id="city"
                  autoComplete="address-level2"
                  placeholder="Dhaka"
                  aria-invalid={Boolean(errors.city)}
                  {...register("city", { required: "City is required." })}
                />
              </Field>

              <Field label="Postcode (optional)" htmlFor="postcode">
                <Input
                  id="postcode"
                  autoComplete="postal-code"
                  placeholder="1230"
                  {...register("postcode")}
                />
              </Field>

              <div className="sm:col-span-2">
                <Field label="Country" htmlFor="country">
                  <div className="relative">
                    <select
                      id="country"
                      autoComplete="country-name"
                      className="h-12 w-full appearance-none rounded-xl border border-input bg-background px-4 pr-10 text-sm focus-visible:border-foreground/40 focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
                      {...register("country")}
                    >
                      <option>Bangladesh</option>
                    </select>
                  </div>
                </Field>
              </div>
            </div>

            <fieldset className="mt-6">
              <legend className="text-[11px] font-medium tracking-[0.12em] uppercase">
                Shipping method
              </legend>
              <div className="mt-3 grid gap-2.5">
                <ShippingOption
                  value="standard"
                  title="Standard — 3–5 working days"
                  price={
                    subtotal >= FREE_SHIPPING_THRESHOLD
                      ? "Complimentary"
                      : formatPrice(STANDARD_SHIPPING)
                  }
                  register={register("shipping")}
                />
                <ShippingOption
                  value="express"
                  title="Express — 1–2 working days"
                  price={formatPrice(EXPRESS_SHIPPING)}
                  register={register("shipping")}
                />
              </div>
            </fieldset>
          </section>

          {/* Payment */}
          <section className="mt-9">
            <div className="flex items-baseline gap-3 border-b border-border pb-3">
              <span className="text-[10px] tracking-[0.16em] text-muted-foreground">
                03
              </span>
              <h2 className="text-[12px] font-medium tracking-[0.1em] uppercase">
                Payment
              </h2>
            </div>

            <fieldset className="mt-5">
              <legend className="sr-only">Payment method</legend>
              <div className="grid gap-2.5">
                <PaymentOption
                  value="bkash"
                  title="bKash"
                  description="Pay securely with your bKash wallet."
                  register={register("payment")}
                />
                <PaymentOption
                  value="card"
                  title="Credit or debit card"
                  description="Visa, Mastercard and Amex."
                  register={register("payment")}
                />
                <PaymentOption
                  value="cod"
                  title="Cash on delivery"
                  description="Pay when your order arrives. Dhaka only."
                  register={register("payment")}
                />
              </div>
            </fieldset>

            <div className="mt-6">
              <Field label="Order note (optional)" htmlFor="note">
                <textarea
                  id="note"
                  rows={3}
                  placeholder="Gift note, delivery instructions…"
                  className="w-full resize-none rounded-xl border border-input bg-background px-4 py-3 text-sm placeholder:text-muted-foreground/70 focus-visible:border-foreground/40 focus-visible:ring-2 focus-visible:ring-ring/30 focus-visible:outline-none"
                  {...register("note")}
                />
              </Field>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="mt-6 w-full"
            >
              <Lock className="size-4" />
              {isSubmitting ? "Placing order…" : `Place order — ${formatPrice(total)}`}
            </Button>

            {previewNotice ? (
              <p
                role="status"
                className="mt-3 rounded-xl bg-muted px-4 py-3 text-[11.5px] leading-relaxed text-muted-foreground"
              >
                This is a preview build: no order was placed, no payment was
                taken, and no data left your browser.
              </p>
            ) : null}

            <p className="mt-3 flex items-center justify-center gap-1.5 text-[10.5px] text-muted-foreground">
              <ShieldCheck className="size-3.5" />
              Your information is encrypted in production.
            </p>
          </section>
        </form>

        {/* Summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-6">
            <h2 className="font-display text-xl">Order summary</h2>

            <ul className="mt-5 space-y-4 border-b border-border pb-5">
              {items.map((item) => (
                <li key={item.key} className="flex gap-3.5">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : null}
                    <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-foreground text-[10px] font-medium text-background">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12.5px] font-medium">
                      {item.name}
                    </p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">
                      {item.color}
                      {item.size && item.size !== "One size"
                        ? ` · ${item.size}`
                        : ""}
                    </p>
                  </div>
                  <p className="text-[12.5px] tabular-nums">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </li>
              ))}
            </ul>

            <dl className="mt-5 space-y-3 text-[13px]">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Shipping</dt>
                <dd className="tabular-nums">
                  {shippingCost === 0
                    ? "Complimentary"
                    : formatPrice(shippingCost)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between border-t border-border pt-3 text-base font-medium">
                <dt>Total</dt>
                <dd className="font-display text-xl tabular-nums">
                  {formatPrice(total)}
                </dd>
              </div>
            </dl>

            <div className="mt-6 flex items-start gap-2.5 rounded-xl bg-sand/70 px-4 py-3 text-[11px] leading-relaxed text-muted-foreground">
              <Truck className="mt-0.5 size-3.5 shrink-0" />
              Orders placed before 2pm ship the same day from our Uttara studio.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  htmlFor,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label htmlFor={htmlFor} className="mb-1.5">
        {label}
      </Label>
      {children}
      {error ? (
        <p role="alert" className="mt-1.5 text-[11px] text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

function ShippingOption({
  value,
  title,
  price,
  register,
}: {
  value: string;
  title: string;
  price: string;
  register: UseFormRegisterReturn;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-4 rounded-xl border border-border p-4 transition-colors hover:border-foreground/25 has-[:checked]:border-foreground has-[:checked]:bg-sand/40">
      <span className="flex items-center gap-3">
        <input
          type="radio"
          value={value}
          className="size-4 accent-[var(--foreground)]"
          {...register}
        />
        <span className="text-[12.5px]">{title}</span>
      </span>
      <span className="text-[12px] font-medium tabular-nums">{price}</span>
    </label>
  );
}

function PaymentOption({
  value,
  title,
  description,
  register,
}: {
  value: string;
  title: string;
  description: string;
  register: UseFormRegisterReturn;
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 transition-colors hover:border-foreground/25 has-[:checked]:border-foreground has-[:checked]:bg-sand/40"
      )}
    >
      <input
        type="radio"
        value={value}
        className="mt-0.5 size-4 accent-[var(--foreground)]"
        {...register}
      />
      <span>
        <span className="block text-[12.5px] font-medium">{title}</span>
        <span className="mt-0.5 block text-[11px] text-muted-foreground">
          {description}
        </span>
      </span>
    </label>
  );
}
