"use client";

import { useToastError, useToastSuccess } from "@/hooks/useToast";
import api from "@/lib/api";
import { RegisterPlatformFormData } from "@/lib/validations/platform";
import { IResponseError } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

interface UpdatePlatformPayload extends RegisterPlatformFormData {
  id: number;
}

export function useMutationUpdatePlatform() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: UpdatePlatformPayload) =>
      api.put(`/platform/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platforms"] });
      useToastSuccess("Plataforma atualizada com sucesso");
    },
    onError: (error: AxiosError<IResponseError>) => {
      useToastError(error);
    },
  });
}
