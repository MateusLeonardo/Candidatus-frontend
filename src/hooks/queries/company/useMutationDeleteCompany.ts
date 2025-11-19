"use client";

import api from "@/lib/api";
import { useToastError, useToastSuccess } from "@/hooks/useToast";
import { IResponseError } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function useMutationDeleteCompany() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/company/${id}`);
      return response.data;
    },
    onSuccess: () => {
      useToastSuccess("Empresa removida com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["companies"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      useToastError(error);
    },
  });
}
