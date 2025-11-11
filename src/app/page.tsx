"use client";
import { Button } from "@/components/ui/button";
import { useMutationLogout } from "@/hooks/queries/auth/useMutationLogout";
import { useUserProfile } from "@/hooks/queries/useUser";
import Link from "next/link";

export default function Home() {
  const useLogoutMutation = useMutationLogout();
  const { data: user } = useUserProfile();

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-2xl font-bold">Home {user?.email}</h1>
      <Link href="/dashboard">Dashboard</Link>
      <Button
        variant="outline"
        className="cursor-pointer"
        onClick={() => useLogoutMutation.mutate()}
      >
        Logout
      </Button>
    </div>
  );
}
