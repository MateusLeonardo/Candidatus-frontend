"use client";
import { StateDialog } from "@/components/dialogs/state-dialog";
import { useGetAllStates } from "@/hooks/queries/state/useGetAllStates";
import { StateTableSkeleton } from "@/components/skeletons/state-table-skeleton";
import { StateTable } from "@/components/tables/state-table";

export default function EstadosPage() {
  const { data, isLoading } = useGetAllStates();

  if (isLoading) return <StateTableSkeleton />;

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
