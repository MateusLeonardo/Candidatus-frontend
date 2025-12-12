"use client";

import { CompanyDialog } from "@/components/company/company-dialog";
import { TableSkeleton } from "@/components/skeletons/table-skeleton";
import { CompanyTable } from "@/components/tables/company-table";
import { getAllCompanies } from "@/hooks/queries/company/get-all-companies";

export default function CompaniesPage() {
  const { data: companies, isLoading } = getAllCompanies();

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
