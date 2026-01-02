import { useToastError, useToastSuccess } from "@/hooks/use-toast";
import api from "@/lib/api";
import { IRequestRegisterApplication } from "@/types/application";
import { IResponseError } from "@/types/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

export function mutationRegisterApplication() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (application: IRequestRegisterApplication) => {
      const response = await api.post("/application", application);
      return response.data;
    },
    onSuccess: () => {
      useToastSuccess("Aplicação registrada com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["applications"] });
    },
    onError: (error: AxiosError<IResponseError>) => {
      useToastError(error);
    },
  });
}
