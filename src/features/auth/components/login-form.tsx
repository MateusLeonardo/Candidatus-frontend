"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "@/lib/validations/auth";
import Link from "next/link";
import { Form } from "@/components/ui/form";
import { mutationLogin } from "../hooks/mutation-login";
import { FormField } from "@/components/shared/form-fields/form-field";

export function LoginForm() {
  const loginMutation = mutationLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginFormData> = (data) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Entrar
          </CardTitle>
          <CardDescription className="text-center">
            Digite suas credenciais para acessar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-4">
            <FormField
              label="E-mail"
              name="email"
              register={register}
              errors={errors}
              placeholder="seu@email.com"
              type="email"
              required
            />
            <FormField
              label="Senha"
              name="password"
              register={register}
              errors={errors}
              placeholder="••••••••"
              type="password"
              required
            />
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Entrando..." : "Entrar"}
            </Button>
          </Form>
          <p className="text-sm text-center">
            Não tem uma conta? <Link href="/registrar">Registrar</Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
