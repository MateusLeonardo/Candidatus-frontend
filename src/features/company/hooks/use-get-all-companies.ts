"use client";

import api from "@/lib/api";
import { IResponseAllCompanies } from "../types/company";
import { useQuery } from "@tanstack/react-query";

export function useGetAllCompanies() {
  return useQuery({
    queryKey: ["companies"],
    queryFn: async () => {
      const response = await api.get("/company");
      return response.data as IResponseAllCompanies;
    },
    staleTime: 1000 * 60 * 60,
  });
}
