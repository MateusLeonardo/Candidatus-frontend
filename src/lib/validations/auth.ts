import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ message: "Digite um e-mail válido" }),
  password: z.string(),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    email: z.email({ message: "Digite um e-mail válido" }),
    password: z
      .string()
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
    confirmPassword: z
      .string()
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não conferem",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterFormData = z.infer<typeof registerSchema>;
