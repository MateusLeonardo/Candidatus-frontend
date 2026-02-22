"use client";

import api from "@/lib/api";
import { IResponseError } from "@/features/auth/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { RegisterStateFormData } from "@/lib/validations/state";
import { showToastError, showToastSuccess } from "@/lib/utils/toast";

interface UpdateStatePayload extends RegisterStateFormData {
  id: number;
}

export function useMutationUpdateState() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: UpdateStatePayload) => {
      const response = await api.put(`/state/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      showToastSuccess("Estado atualizado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["states"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      showToastError(error);
    },
  });
}
