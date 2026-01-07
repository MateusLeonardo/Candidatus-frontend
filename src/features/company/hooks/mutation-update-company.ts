"use client";

import api from "@/lib/api";
import { useToastError, useToastSuccess } from "@/hooks/use-toast";
import { IResponseError } from "@/features/auth/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { RegisterCompanyFormData } from "@/lib/validations/company";

interface UpdateCompanyPayload extends RegisterCompanyFormData {
  id: number;
}

export function mutationUpdateCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: UpdateCompanyPayload) =>
      api.put(`/company/${id}`, data),
    onSuccess: () => {
      useToastSuccess("Empresa atualizada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      useToastError(error);
    },
  });
}

