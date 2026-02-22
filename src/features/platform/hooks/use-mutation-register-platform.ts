"use client";

import api from "@/lib/api";
import { RegisterPlatformFormData } from "@/lib/validations/platform";
import { IResponseError } from "@/features/auth/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { showToastError, showToastSuccess } from "@/lib/utils/toast";

export function useMutationRegisterPlatform() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: RegisterPlatformFormData) =>
      api.post("/platform", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platforms"] });
      showToastSuccess("Plataforma registrada com sucesso");
    },
    onError: (error: AxiosError<IResponseError>) => {
      showToastError(error);
    },
  });
}
