"use client";
import { useUserProfile } from "@/hooks/queries/useUser";
import { useUserStore } from "@/stores/user-store";
import { Metadata } from "next";
import Link from "next/link";

// export const metadata: Metadata = {
//   title: "Dashboard",
// };

export default function DashboardPage() {
  const { data: user, isLoading } = useUserProfile();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-2xl font-bold">Dashboard {user?.email}</h1>
      <Link href="/">Home</Link>
    </div>
  );
}
