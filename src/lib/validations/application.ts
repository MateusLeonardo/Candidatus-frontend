import { ApplicationStatus } from "@/enums/application-status";
import { WorkMode } from "@/enums/work-mode";
import z from "zod";

export const registerApplicationSchema = z.object({
  title: z.string().min(1, { message: "O título é obrigatório" }),
  description: z.string().min(1, { message: "A descrição é obrigatória" }),
  salary: z.number().min(1, { message: "O salário é obrigatório" }),
  workMode: z.enum(WorkMode, { message: "O modo de trabalho é obrigatório" }),
  url: z.url().min(1, { message: "A URL é obrigatória" }),
  applicationDate: z.date({ message: "A data da aplicação é obrigatória" }),
  status: z.enum(ApplicationStatus, { message: "O status é obrigatório" }),
  platformId: z.number().min(1, { message: "A plataforma é obrigatória" }),
  companyId: z.number().min(1, { message: "A empresa é obrigatória" }),
});

export type RegisterApplicationFormData = z.infer<
  typeof registerApplicationSchema
>;
