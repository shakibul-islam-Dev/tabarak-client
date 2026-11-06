import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Providers } from "@/components/providers/Providers";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchDialog } from "@/components/layout/SearchDialog";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Tabark — Considered pieces for an unhurried life",
    template: "%s · Tabark",
  },
  description:
    "Tabark is a modern essentials house: quiet tailoring, leather and objects for the home, made in small batches from natural materials.",
  keywords: [
    "Tabark",
    "minimal fashion",
    "organic cotton",
    "leather goods",
    "homeware",
    "Dhaka",
  ],
  openGraph: {
    title: "Tabark — Considered pieces for an unhurried life",
    description:
      "Quiet tailoring, leather and objects for the home. Made in small batches, designed to be kept.",
    type: "website",
    locale: "en_US",
    siteName: "Tabark",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tabark",
    description: "Considered pieces for an unhurried life.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#faf8f4" },
    { media: "(prefers-color-scheme: dark)", color: "#171512" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased`}
    >
      <body className="min-h-dvh bg-background text-foreground">
        <Providers>
          <SmoothScroll>
            <a
              href="#content"
              className="sr-only z-[100] rounded-full bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
            >
              Skip to content
            </a>

            <div className="flex min-h-dvh flex-col">
              <AnnouncementBar />
              <Header />
              <main id="content" className="flex-1">
                {children}
              </main>
              <Footer />
            </div>

            <CartDrawer />
            <SearchDialog />
            <Toaster position="bottom-right" richColors closeButton />
          </SmoothScroll>
        </Providers>
      </body>
    </html>
  );
}
