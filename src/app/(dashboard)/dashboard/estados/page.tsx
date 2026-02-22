"use client";
import { StateDialog } from "@/features/state/components/state-dialog";
import { StateTable } from "@/features/state/components/state-table";
import { TableSkeleton } from "@/components/shared/table-skeleton";
import { useGetAllStates } from "@/features/state/hooks/use-get-all-states";

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
