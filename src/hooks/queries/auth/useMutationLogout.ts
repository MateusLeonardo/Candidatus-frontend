"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export function useMutationLogout() {
  const router = useRouter();
  return useMutation({
    mutationFn: async () => {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      router.push("/login");
    },
  });
}
