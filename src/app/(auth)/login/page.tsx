import { LoginForm } from "@/components/forms/login-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Faça login na sua conta",
};

export default function LoginPage() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
