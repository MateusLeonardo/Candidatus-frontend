"use client";
import api from "@/lib/api";
import { IResponseError } from "@/features/auth/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useToastSuccess } from "@/hooks/use-toast";
import { useToastError } from "@/hooks/use-toast";
import { RegisterCompanyFormData } from "@/lib/validations/company";

export function mutationRegisterCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RegisterCompanyFormData) =>
      api.post("/company", data),
    onSuccess: () => {
      useToastSuccess("Empresa registrada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      useToastError(error);
    },
  });
}
