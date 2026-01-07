"use client";
import api from "@/lib/api";
import { IResponseAllStates } from "../types/state";
import { useQuery } from "@tanstack/react-query";

export function getAllStates() {
  return useQuery({
    queryKey: ["states"],
    queryFn: async () => {
      const response = await api.get("/state");
      return response.data as IResponseAllStates;
    },
  });
}
