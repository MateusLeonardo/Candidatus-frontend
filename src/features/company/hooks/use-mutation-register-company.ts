"use client";
import api from "@/lib/api";
import { IResponseError } from "@/features/auth/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { RegisterCompanyFormData } from "@/lib/validations/company";
import { showToastError, showToastSuccess } from "@/lib/utils/toast";

export function useMutationRegisterCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: RegisterCompanyFormData) =>
      api.post("/company", data),
    onSuccess: () => {
      showToastSuccess("Empresa registrada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      showToastError(error);
    },
  });
}
