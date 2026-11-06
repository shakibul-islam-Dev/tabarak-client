import type { Metadata } from "next";
import { AuthShell } from "@/components/authentication/AuthShell";
import { ForgotPasswordForm } from "@/components/authentication/ForgotPasswordForm";

export const metadata: Metadata = {
  title: "Reset password",
  description: "Reset the password on your Tabark account.",
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell>
      <ForgotPasswordForm />
    </AuthShell>
  );
}
