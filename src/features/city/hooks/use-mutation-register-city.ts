import api from "@/lib/api";
import { IResponseError } from "@/features/auth/types/auth";
import { IRequestRegisterCity } from "../types/city";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { showToastError, showToastSuccess } from "@/lib/utils/toast";

export function useMutationRegisterCity() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (city: IRequestRegisterCity) => {
      const response = await api.post("/city", city);
      return response.data;
    },
    onSuccess: () => {
      showToastSuccess("Cidade registrada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["cities"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      showToastError(error);
    },
  });
}
