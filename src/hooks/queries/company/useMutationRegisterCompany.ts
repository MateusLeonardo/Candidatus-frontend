"use client";
import api from "@/lib/api";
import { IResponseError } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useToastSuccess } from "@/hooks/useToast";
import { useToastError } from "@/hooks/useToast";
import { RegisterCompanyFormData } from "@/lib/validations/company";

export function useMutationRegisterCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RegisterCompanyFormData) => {
      const response = await api.post("/company", data);
      return response.data;
    },
    onSuccess: () => {
      useToastSuccess("Empresa registrada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      useToastError(error);
    },
  });
}
