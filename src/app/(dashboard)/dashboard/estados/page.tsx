"use client";
import { StateDialog } from "@/components/state/state-dialog";
import { useGetAllStates } from "@/hooks/queries/state/get-all-states";
import { StateTable } from "@/components/tables/state-table";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";

export default function EstadosPage() {
  const { data, isLoading } = useGetAllStates();

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="my-8 px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6 text-start">Estados</h1>
        <StateDialog />
      </div>
      <div className="overflow-x-auto">
        <StateTable states={data?.states ?? []} />
      </div>
    </div>
  );
}
