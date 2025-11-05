import { RegisterForm } from "@/components/forms/register-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registrar",
  description: "Faça seu cadastro na plataforma",
};

export default function RegistrarPage() {
  return (
    <div>
      <RegisterForm />
    </div>
  );
}
