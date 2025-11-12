"use client";

import { CityDialog } from "@/components/dialogs/city-dialog";
import { CityTableSkeleton } from "@/components/skeletons/city-table-skeleton";
import { CityTable } from "@/components/tables/city-table";
import { useGetAllCities } from "@/hooks/queries/city/useGetAllCities";

export default function CidadesPage() {
  const { data: cities, isLoading: isLoadingCities } = useGetAllCities();

  if (isLoadingCities) return <CityTableSkeleton />;

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
