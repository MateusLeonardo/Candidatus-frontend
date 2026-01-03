"use client";
import { ApplicationDialog } from "@/components/application/application-dialog";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import { ApplicationTable } from "@/components/tables/application-table";
import { getAllApplications } from "@/hooks/queries/application/get-all-applications";

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
