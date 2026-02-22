import api from "@/lib/api";
import { IResponseError } from "@/features/auth/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { showToastError, showToastSuccess } from "@/lib/utils/toast";

export function useMutationDeleteApplication() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/application/${id}`),
    onSuccess: () => {
      showToastSuccess("Aplicação removida com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      showToastError(error);
    },
  });
}
