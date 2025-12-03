import z from "zod";

export const registerPlatformSchema = z.object({
  name: z.string().min(1, { message: "O nome da plataforma é obrigatório" }),
  url: z.url({ message: "A URL da plataforma é inválida" }),
});

export type RegisterPlatformFormData = z.infer<typeof registerPlatformSchema>;
