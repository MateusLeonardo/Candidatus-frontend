"use client";
import api from "@/lib/api";
import { IResponseAllStates } from "../types/state";
import { useQuery } from "@tanstack/react-query";

export function useGetAllStates() {
  return useQuery({
    queryKey: ["states"],
    queryFn: async () => {
      const response = await api.get("/state");
      return response.data as IResponseAllStates;
    },
    staleTime: 1000 * 60 * 60,
  });
}
