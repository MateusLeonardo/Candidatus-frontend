"use client";
import { ApplicationDialog } from "@/features/application/components/application-dialog";
import { ApplicationTable } from "@/features/application/components/application-table";
import { TableSkeleton } from "@/components/shared/table-skeleton";
import { getAllApplications } from "@/features/application/hooks/get-all-applications";

export default function AplicacoesPage() {
  const { data, isLoading } = getAllApplications();

  if (isLoading) return <TableSkeleton />;
  return (
    <div className="my-8 px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6 text-start">Aplicações</h1>
        <ApplicationDialog />
      </div>
      <div className="overflow-x-auto">
        <ApplicationTable applications={data?.applications ?? []} />
      </div>
    </div>
  );
}
