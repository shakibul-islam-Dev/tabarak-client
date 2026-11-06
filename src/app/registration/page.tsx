import type { Metadata } from "next";
import { AuthShell } from "@/components/authentication/AuthShell";
import { RegistrationForm } from "@/components/authentication/RegistrationForm";

export const metadata: Metadata = {
  title: "Create an account",
  description: "Create your Tabark account.",
};

export default function RegistrationPage() {
  return (
    <AuthShell>
      <RegistrationForm />
    </AuthShell>
  );
}
