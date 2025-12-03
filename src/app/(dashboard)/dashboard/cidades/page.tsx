"use client";

import { CityDialog } from "@/components/city/city-dialog";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import { CityTable } from "@/components/tables/city-table";
import { useGetAllCities } from "@/hooks/queries/city/get-all-cities";

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
