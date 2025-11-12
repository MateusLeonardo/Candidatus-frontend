import { z } from "zod";

export const registerCitySchema = z.object({
  name: z.string().min(1, { message: "O nome da cidade é obrigatório" }),
  stateId: z.number().positive({ message: "O estado é obrigatório" }),
});

export type RegisterCityFormData = z.infer<typeof registerCitySchema>;
