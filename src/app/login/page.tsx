import type { Metadata } from "next";
import { AuthShell } from "@/components/authentication/AuthShell";
import { SignInForm } from "@/components/authentication/SignInForm";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your Tabark account.",
};

export default function SignInPage() {
  return (
    <AuthShell>
      <SignInForm />
    </AuthShell>
  );
}
