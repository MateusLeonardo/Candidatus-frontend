import { ApplicationStatus } from "@/enums/application-status";
import { WorkMode } from "@/enums/work-mode";
import { ICompany } from "@/features/company/types/company";
import { RegisterApplicationFormData } from "@/lib/validations/application";

export interface IApplication {
  id: number;
  title: string;
  description: string;
  salary: number;
  workMode: WorkMode;
  url: string;
  applicationDate: Date;
  status: ApplicationStatus;
  userId: number;
  platformId: number;
  companyId: number;
  company: ICompany;
}

export interface IResponseAllApplications {
  applications: IApplication[];
}

export interface UpdateApplicationPayload extends RegisterApplicationFormData {
  id: number;
}
