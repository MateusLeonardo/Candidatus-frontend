"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterFormData } from "@/lib/validations/auth";
import Link from "next/link";
import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { mutationRegisterUser } from "../hooks/mutation-register-user";
import { FormField } from "@/components/shared/form-fields/form-field";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const registerMutation = mutationRegisterUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit: SubmitHandler<RegisterFormData> = (data) => {
    const requestData = {
      email: data.email,
      password: data.password,
    };
    registerMutation.mutate(requestData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Registrar
          </CardTitle>
          <CardDescription className="text-center">
            Digite suas credenciais para registrar sua conta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mb-4">
            <FormField
              label="E-mail"
              name="email"
              register={register}
              errors={errors}
              placeholder="seu@email.com"
              type="email"
              required
              disabled={registerMutation.isPending}
            />
            <FormField
              label="Senha"
              name="password"
              register={register}
              errors={errors}
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              required
              disabled={registerMutation.isPending}
            />
            <FormField
              label="Confirmar Senha"
              name="confirmPassword"
              register={register}
              errors={errors}
              placeholder="••••••••"
              type={showPassword ? "text" : "password"}
              required
              disabled={registerMutation.isPending}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOffIcon className="w-4 h-4" />
              ) : (
                <EyeIcon className="w-4 h-4" />
              )}
            </Button>

            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={registerMutation.isPending}
            >
              {registerMutation.isPending ? "Registrando..." : "Registrar"}
            </Button>
            <p className="text-sm text-center">
              Já tem uma conta? <Link href="/login">Entrar</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
