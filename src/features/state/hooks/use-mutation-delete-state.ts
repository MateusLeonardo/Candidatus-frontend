"use client";

import api from "@/lib/api";
import { IResponseError } from "@/features/auth/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { showToastError, showToastSuccess } from "@/lib/utils/toast";

export function useMutationDeleteState() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => api.delete(`/state/${id}`),
    onSuccess: () => {
      showToastSuccess("Estado removido com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["states"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      showToastError(error);
    },
  });
}
