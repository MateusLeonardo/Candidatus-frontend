import api from "@/lib/api";
import { IResponseError } from "@/features/auth/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { showToastError, showToastSuccess } from "@/lib/utils/toast";
import { UpdateApplicationPayload } from "../types/application";

export function useMutationUpdateApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: UpdateApplicationPayload) =>
      api.put(`/application/${id}`, data),
    onSuccess: () => {
      showToastSuccess("Aplicação atualizada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      showToastError(error);
    },
  });
}
