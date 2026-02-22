import api from "@/lib/api";
import { IResponseError } from "@/features/auth/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { showToastError, showToastSuccess } from "@/lib/utils/toast";
import { RegisterApplicationFormData } from "@/lib/validations/application";

export function useMutationRegisterApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (application: RegisterApplicationFormData) => {
      const response = await api.post("/application", application);
      return response.data;
    },
    onSuccess: () => {
      showToastSuccess("Aplicação registrada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      showToastError(error);
    },
  });
}
