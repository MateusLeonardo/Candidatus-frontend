import z from "zod";

export const registerStateSchema = z.object({
  name: z.string().min(1, { message: "O nome do estado é obrigatório" }),
  uf: z
    .string()
    .min(1, { message: "A sigla do estado é obrigatória" })
    .max(2, { message: "A sigla do estado deve ter 2 caracteres" }),
});

export type RegisterStateFormData = z.infer<typeof registerStateSchema>;
