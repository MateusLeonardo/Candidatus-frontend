import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { ICompany } from "../types/company";
import { mutationDeleteCompany } from "../hooks/mutation-delete-company";
import { CompanyDialog } from "./company-dialog";

interface CompanyTableProps {
  companies: ICompany[];
}
export function CompanyTable({ companies }: CompanyTableProps) {
  const deleteCompanyMutation = mutationDeleteCompany();

  return (
    <Table>
      <TableHeader className="bg-accent">
        <TableRow>
          <TableHead className="text-lg">Nome</TableHead>
          <TableHead className="text-lg">Cidade</TableHead>
          <TableHead className="text-lg text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {companies.map((company: ICompany) => (
          <TableRow key={company.id}>
            <TableCell className="py-3 text-md">{company.name}</TableCell>
            <TableCell className="py-3 text-md">{company.city.name}</TableCell>
            <TableCell className="py-3 text-md text-center">
              <div className="flex justify-center gap-2">
                <CompanyDialog
                  company={company}
                  trigger={
                    <Button
                      variant="outline"
                      size="icon"
                      className="cursor-pointer"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                  }
                />
                <ConfirmDialog
                  deleteMutation={deleteCompanyMutation}
                  id={company.id}
                  title={company.name}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
