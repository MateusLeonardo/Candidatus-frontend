"use client";
import { PlatformDialog } from "@/features/platform/components/platform-dialog";
import { PlatformTable } from "@/features/platform/components/platform-table";
import { TableSkeleton } from "@/components/shared/table-skeleton";
import { getAllPlatforms } from "@/features/platform/hooks/get-all-platforms";

export default function PlataformasPage() {
  const { data, isLoading } = getAllPlatforms();

  if (isLoading) return <TableSkeleton />;
  return (
    <div className="my-8 px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6 text-start">Plataformas</h1>
        <PlatformDialog />
      </div>
      <div className="overflow-x-auto">
        <PlatformTable platforms={data?.platforms ?? []} />
      </div>
    </div>
  );
}
