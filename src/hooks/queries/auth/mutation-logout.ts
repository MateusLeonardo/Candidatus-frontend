"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useUserContext } from "@/context/user-context";

export function mutationLogout() {
  const router = useRouter();
  const { setUserToLocalStorage } = useUserContext();
  return useMutation({
    mutationFn: async () => {
      Cookies.remove("access_token");
      Cookies.remove("refresh_token");
      setUserToLocalStorage(null);
      router.push("/login");
    },
  });
}
