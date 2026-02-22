import api from "@/lib/api";
import { IResponseError } from "@/features/auth/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { showToastError, showToastSuccess } from "@/lib/utils/toast";

export function useMutationDeleteCity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => api.delete(`/city/${id}`),
    onSuccess: () => {
      showToastSuccess("Cidade removida com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["cities"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      showToastError(error);
    },
  });
}
