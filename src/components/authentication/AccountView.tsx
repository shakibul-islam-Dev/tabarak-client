"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  Heart,
  LogOut,
  MapPin,
  Package,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import { useHydrated } from "@/hooks/use-hydrated";
import { useWishlistStore, selectWishlistCount } from "@/store/wishlist";
import { Button } from "@/components/ui/button";

type SessionUser = {
  id: string;
  name: string;
  email: string;
};

export function AccountView() {
  const [status, setStatus] = useState<"loading" | "guest" | "user">("loading");
  const [user, setUser] = useState<SessionUser | null>(null);
  const [signingOut, setSigningOut] = useState(false);

  const hydrated = useHydrated();
  const wishlistCount = useWishlistStore(selectWishlistCount);

  useEffect(() => {
    const controller = new AbortController();

    fetch("/api/auth/me", { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Not signed in");
        return (await response.json()) as { user: SessionUser };
      })
      .then((data) => {
        setUser(data.user);
        setStatus("user");
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setStatus("guest");
      });

    return () => controller.abort();
  }, []);

  const handleSignOut = async () => {
    setSigningOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      setUser(null);
      setStatus("guest");
      toast.success("Signed out");
    } catch {
      toast.error("Couldn't sign out. Please try again.");
    } finally {
      setSigningOut(false);
    }
  };

  if (status === "loading") {
    return (
      <div className="shell py-12 lg:py-16">
        <div className="h-8 w-48 animate-pulse rounded-full bg-muted" />
        <div className="mt-10 grid gap-6 lg:grid-cols-[220px_1fr]">
          <div className="h-40 animate-pulse rounded-2xl bg-muted" />
          <div className="h-64 animate-pulse rounded-2xl bg-muted" />
        </div>
      </div>
    );
  }

  if (status === "guest" || !user) {
    return (
      <div className="shell py-16 lg:py-24">
        <div className="mx-auto max-w-md text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-full bg-muted text-muted-foreground">
            <UserRound className="size-6" />
          </div>
          <h1 className="mt-6 font-display text-4xl font-light tracking-[-0.02em]">
            Your account
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Sign in to see your wishlist, order history and saved details — or
            create an account in a few seconds.
          </p>
          <div className="mt-8 flex flex-col gap-2.5 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/registration">Create an account</Link>
            </Button>
          </div>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-2 text-[12px] text-muted-foreground transition-colors hover:text-foreground"
          >
            Continue shopping
            <ArrowRight className="size-3.5" />
          </Link>
        </div>
      </div>
    );
  }

  const firstName = user.name.split(" ")[0];

  return (
    <div className="shell py-10 lg:py-16">
      <p className="eyebrow">Account</p>
      <h1 className="mt-3 font-display text-[clamp(2.25rem,5vw,3.5rem)] leading-[1.02] font-light tracking-[-0.025em]">
        Hello, {firstName}.
      </h1>

      <div className="mt-10 grid gap-8 lg:grid-cols-[240px_1fr] lg:gap-12">
        <aside>
          <nav aria-label="Account" className="flex flex-col gap-1">
            <Link
              href="/account"
              aria-current="page"
              className="flex items-center gap-3 rounded-xl bg-sand/70 px-4 py-3 text-[13px] font-medium"
            >
              <UserRound className="size-4" />
              Overview
            </Link>
            <Link
              href="/wishlist"
              className="flex items-center justify-between rounded-xl px-4 py-3 text-[13px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <span className="flex items-center gap-3">
                <Heart className="size-4" />
                Wishlist
              </span>
              <span className="text-[11px]">
                {hydrated ? wishlistCount : 0}
              </span>
            </Link>
            <Link
              href="/shop"
              className="flex items-center gap-3 rounded-xl px-4 py-3 text-[13px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Package className="size-4" />
              Continue shopping
            </Link>
          </nav>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="mt-6 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[13px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:opacity-50"
          >
            <LogOut className="size-4" />
            {signingOut ? "Signing out…" : "Sign out"}
          </button>
        </aside>

        <div className="grid gap-4 sm:grid-cols-2">
          <section className="rounded-2xl border border-border bg-card p-6">
            <h2 className="text-[11px] font-medium tracking-[0.14em] uppercase">
              Profile
            </h2>
            <p className="mt-4 text-[14px] font-medium">{user.name}</p>
            <p className="mt-1 text-[12.5px] text-muted-foreground">
              {user.email}
            </p>
            <Link
              href="/contact"
              className="mt-5 inline-flex items-center gap-2 text-[11.5px] underline underline-offset-4 transition-colors hover:text-brand"
            >
              Need to change your details?
            </Link>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6">
            <div className="flex items-center gap-2">
              <Heart className="size-4 text-brand" />
              <h2 className="text-[11px] font-medium tracking-[0.14em] uppercase">
                Wishlist
              </h2>
            </div>
            <p className="mt-4 font-display text-3xl">
              {hydrated ? wishlistCount : 0}
            </p>
            <p className="mt-1 text-[12.5px] text-muted-foreground">
              {wishlistCount === 1 ? "saved piece" : "saved pieces"}
            </p>
            <Link
              href="/wishlist"
              className="mt-5 inline-flex items-center gap-2 text-[11.5px] underline underline-offset-4 transition-colors hover:text-brand"
            >
              View wishlist
            </Link>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 sm:col-span-2">
            <div className="flex items-center gap-2">
              <Package className="size-4 text-brand" />
              <h2 className="text-[11px] font-medium tracking-[0.14em] uppercase">
                Orders
              </h2>
            </div>
            <p className="mt-4 text-[13px] text-muted-foreground">
              No orders yet. When you place your first order it will appear here
              with tracking and receipts.
            </p>
            <Button asChild variant="outline" size="sm" className="mt-5">
              <Link href="/shop">Start shopping</Link>
            </Button>
          </section>

          <section className="rounded-2xl border border-border bg-card p-6 sm:col-span-2">
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-brand" />
              <h2 className="text-[11px] font-medium tracking-[0.14em] uppercase">
                Addresses
              </h2>
            </div>
            <p className="mt-4 text-[13px] text-muted-foreground">
              No saved addresses. Add one at checkout and we&apos;ll keep it for
              next time.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
