import { ICity } from "@/features/city/types/city";
import { RegisterCompanyFormData } from "@/lib/validations/company";

export interface ICompany {
  id: number;
  name: string;
  cityId: number;
  city: ICity;
}
export interface IResponseAllCompanies {
  companies: ICompany[];
}
export interface UpdateCompanyPayload extends RegisterCompanyFormData {
  id: number;
}
