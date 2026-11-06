"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiShoppingBag } from "react-icons/gi";
import {
  ArrowRight,
  Heart,
  Menu,
  Search,
  UserRound,
} from "lucide-react";
import { cn } from "cn";
import { useHydrated } from "@/hooks/use-hydrated";
import { mainNav } from "@/lib/navigation";
import { useCartStore, selectCartCount } from "@/store/cart";
import { useUiStore } from "@/store/ui";
import { useWishlistStore, selectWishlistCount } from "@/store/wishlist";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const openCart = useUiStore((state) => state.openCart);
  const setSearchOpen = useUiStore((state) => state.setSearchOpen);

  const hydrated = useHydrated();
  const cartCount = useCartStore(selectCartCount);
  const wishlistCount = useWishlistStore(selectWishlistCount);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [setSearchOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b bg-background/85 backdrop-blur-xl transition-colors duration-300",
          scrolled ? "border-border" : "border-transparent"
        )}
      >
        <div className="shell grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-3 lg:h-20">
          {/* Left: mobile trigger + desktop navigation */}
          <div className="flex items-center gap-1 lg:gap-7">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
              className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-muted lg:hidden"
            >
              <Menu className="size-5" />
            </button>

            <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
              {mainNav.slice(0, 3).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cn(
                    "link-underline text-[13px] tracking-[0.01em] transition-colors",
                    isActive(item.href)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* Center: wordmark */}
          <Link
            href="/"
            aria-label="Tabarak — home"
            className="justify-self-center font-display text-[26px] leading-none tracking-[-0.015em] lg:text-[30px]"
          >
            Tabarak<span className="text-brand">.</span>
          </Link>

          {/* Right: actions */}
          <div className="flex items-center justify-end gap-0.5 sm:gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="hidden size-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-muted hover:text-foreground sm:flex"
            >
              <Search className="size-[18px]" />
            </button>

            <ThemeToggle className="hidden sm:flex" />

            <Link
              href="/account"
              aria-label="Account"
              className="hidden size-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-muted hover:text-foreground lg:flex"
            >
              <UserRound className="size-[18px]" />
            </Link>

            <Link
              href="/wishlist"
              aria-label={`Wishlist${hydrated && wishlistCount > 0 ? `, ${wishlistCount} items` : ""}`}
              className="relative flex size-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
            >
              <Heart className="size-[18px]" />
              {hydrated && wishlistCount > 0 ? (
                <span className="absolute top-1 right-0.5 flex size-4 items-center justify-center rounded-full bg-foreground text-[9px] font-semibold text-background">
                  {wishlistCount}
                </span>
              ) : null}
            </Link>
          </div>
        </div>

        {/* Mobile navigation */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetContent
            side="left"
            className="w-[min(360px,88vw)] max-w-[360px] p-0"
            closeLabel="Close menu"
          >
            <div data-lenis-prevent className="flex h-full flex-col overflow-y-auto">
              <div className="border-b border-border px-6 py-6">
                <SheetHeader>
                  <SheetTitle className="sr-only">Menu</SheetTitle>
                  <SheetDescription className="sr-only">
                    Navigate the Tabarak store
                  </SheetDescription>
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="font-display text-[28px] leading-none tracking-[-0.015em]"
                  >
                    Tabarak<span className="text-brand">.</span>
                  </Link>
                </SheetHeader>
              </div>

              <nav aria-label="Mobile" className="px-6 py-8">
                <ul className="flex flex-col gap-1">
                  {mainNav.map((item, index) => (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="group flex items-baseline justify-between border-b border-border/60 py-4"
                      >
                        <span className="font-display text-3xl font-light tracking-tight transition-colors group-hover:text-brand">
                          {item.name}
                        </span>
                        <span className="text-[10px] tracking-[0.2em] text-muted-foreground">
                          0{index + 1}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="px-6 pb-6">
                <p className="eyebrow mb-4">Account</p>
                <div className="flex flex-col gap-1 text-sm">
                  <Link
                    href="/login"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-3 transition-colors hover:bg-muted"
                  >
                    Sign in
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </Link>
                  <Link
                    href="/registration"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-3 transition-colors hover:bg-muted"
                  >
                    Create an account
                    <ArrowRight className="size-4 text-muted-foreground" />
                  </Link>
                  <Link
                    href="/wishlist"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-between rounded-xl px-3 py-3 transition-colors hover:bg-muted"
                  >
                    Wishlist
                    <span className="text-xs text-muted-foreground">
                      {hydrated ? wishlistCount : 0}
                    </span>
                  </Link>
                </div>
              </div>

              <div className="mt-auto border-t border-border px-6 py-6">
                <button
                  type="button"
                  onClick={() => {
                    setMobileOpen(false);
                    setSearchOpen(true);
                  }}
                  className="flex w-full items-center gap-3 rounded-full border border-border px-4 py-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                >
                  <Search className="size-4" />
                  Search the collection
                </button>
                <p className="mt-6 text-[11px] leading-relaxed tracking-wide text-muted-foreground">
                  Uttara, Dhaka
                  <br />
                  hello@tabarak.com
                </p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>

      {/* Floating Bottom Right Cart Button for All Devices */}
      <button
        type="button"
        onClick={openCart}
        aria-label={`Open floating bag${hydrated && cartCount > 0 ? `, ${cartCount} items` : ""}`}
        className="fixed bottom-5 right-5 z-50 flex size-12 items-center justify-center rounded-full border border-border bg-background/90 text-foreground shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-muted active:scale-95 sm:bottom-8 sm:right-8 sm:size-14"
      >
        <GiShoppingBag className="size-5 sm:size-6" />
        {hydrated && cartCount > 0 ? (
          <span className="absolute -top-1 -right-1 flex min-w-5 items-center justify-center rounded-full bg-brand px-1 text-[10px] font-bold text-brand-foreground shadow-sm sm:h-5">
            {cartCount}
          </span>
        ) : null}
      </button>
    </>
  );
}