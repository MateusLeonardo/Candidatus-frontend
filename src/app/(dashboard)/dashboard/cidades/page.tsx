"use client";

import { CityDialog } from "@/features/city/components/city-dialog";
import { CityTable } from "@/features/city/components/city-table";
import { TableSkeleton } from "@/components/shared/table-skeleton";
import { useGetAllCities } from "@/features/city/hooks/use-get-all-cities";

export default function CidadesPage() {
  const { data: cities, isLoading: isLoadingCities } = useGetAllCities();

  if (isLoadingCities) return <TableSkeleton />;

  return (
    <div className="my-8 px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6 text-start">Cidades</h1>
        <CityDialog />
      </div>
      <div className="overflow-x-auto">
        <CityTable cities={cities?.cities ?? []} />
      </div>
    </div>
  );
}
