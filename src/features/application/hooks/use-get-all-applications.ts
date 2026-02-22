import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { IResponseAllApplications } from "../types/application";

export function useGetAllApplications() {
  return useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const response = await api.get("/application");
      return response.data as IResponseAllApplications;
    },
    staleTime: 1000 * 60 * 60,
  });
}
