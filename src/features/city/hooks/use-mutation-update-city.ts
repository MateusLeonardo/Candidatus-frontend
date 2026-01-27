import api from "@/lib/api";
import { IResponseError } from "@/features/auth/types/auth";
import { IRequestUpdateCity } from "../types/city";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { showToastError, showToastSuccess } from "@/lib/utils/toast";

interface UpdateCityPayload extends IRequestUpdateCity {
  id: number;
}

export function useMutationUpdateCity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, ...data }: UpdateCityPayload) =>
      api.put(`/city/${id}`, data),
    onSuccess: () => {
      showToastSuccess("Cidade atualizada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["cities"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      showToastError(error);
    },
  });
}
