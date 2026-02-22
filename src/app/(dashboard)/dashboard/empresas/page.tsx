"use client";

import { CompanyDialog } from "@/features/company/components/company-dialog";
import { CompanyTable } from "@/features/company/components/company-table";
import { TableSkeleton } from "@/components/shared/table-skeleton";
import { useGetAllCompanies } from "@/features/company/hooks/use-get-all-companies";

export default function CompaniesPage() {
  const { data: companies, isLoading } = useGetAllCompanies();

  if (isLoading) return <TableSkeleton />;

  return (
    <div className="my-8 px-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-6 text-start">Empresas</h1>
        <CompanyDialog />
      </div>
      <div className="overflow-x-auto">
        <CompanyTable companies={companies?.companies ?? []} />
      </div>
    </div>
  );
}
