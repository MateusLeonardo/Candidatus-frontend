import { ApplicationStatus } from "@/enums/application-status";
import { WorkMode } from "@/enums/work-mode";

export interface IApplication {
  id: number;
  title: string;
  description: string;
  salary: number;
  workMode: WorkMode;
  url: string;
  applicationDate: Date;
  applicationStatus: ApplicationStatus;
  userId: number;
  platformId: number;
  companyId: number;
}
