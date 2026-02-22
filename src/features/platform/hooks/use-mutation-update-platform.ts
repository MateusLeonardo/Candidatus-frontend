"use client";

import api from "@/lib/api";
import { IResponseError } from "@/features/auth/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { showToastError, showToastSuccess } from "@/lib/utils/toast";
import { UpdatePlatformPayload } from "../types/platform";

export function useMutationUpdatePlatform() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, ...data }: UpdatePlatformPayload) =>
      api.put(`/platform/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platforms"] });
      showToastSuccess("Plataforma atualizada com sucesso");
    },
    onError: (error: AxiosError<IResponseError>) => {
      showToastError(error);
    },
  });
}
