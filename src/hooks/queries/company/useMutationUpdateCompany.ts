"use client";

import api from "@/lib/api";
import { useToastError, useToastSuccess } from "@/hooks/useToast";
import { IResponseError } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { RegisterCompanyFormData } from "@/lib/validations/company";

interface UpdateCompanyPayload extends RegisterCompanyFormData {
  id: number;
}

export function useMutationUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: UpdateCompanyPayload) => {
      const response = await api.put(`/company/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      useToastSuccess("Empresa atualizada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      useToastError(error);
    },
  });
}
