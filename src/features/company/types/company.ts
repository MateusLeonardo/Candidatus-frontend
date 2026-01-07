import { ICity } from "@/features/city/types/city";

export interface ICompany {
  id: number;
  name: string;
  cityId: number;
  city: ICity;
}
export interface IResponseAllCompanies {
  companies: ICompany[];
}
