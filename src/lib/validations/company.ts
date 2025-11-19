import z from "zod";

export const registerCompanySchema = z.object({
  name: z.string().min(1, { message: "O nome da empresa é obrigatório" }),
  cityId: z.number().min(1, { message: "A cidade é obrigatória" }),
});

export type RegisterCompanyFormData = z.infer<typeof registerCompanySchema>;
