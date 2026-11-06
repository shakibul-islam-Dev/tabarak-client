import type { Metadata } from "next";
import { AccountView } from "@/components/authentication/AccountView";

export const metadata: Metadata = {
  title: "Your account",
  description: "Manage your Tabark account, wishlist and orders.",
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return (
    <section className="pt-6 sm:pt-8">
      <AccountView />
    </section>
  );
}
