"use client";
import { ModeToggle } from "@/components/mode-toggle";
import { useUserProfile } from "@/hooks/queries/use-user";
import Link from "next/link";

// export const metadata: Metadata = {
//   title: "Dashboard",
// };

export default function DashboardPage() {
  const { data: user, isLoading } = useUserProfile();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <ModeToggle />
      <h1 className="text-2xl font-bold">Dashboard {user?.email}</h1>
      <Link href="/">Home</Link>
    </div>
  );
}
