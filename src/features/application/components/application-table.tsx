"use client";
import {
  ApplicationStatus,
  ApplicationStatusLabel,
} from "@/enums/application-status";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import { IApplication } from "../types/application";
import { formatCurrency } from "@/lib/utils";
import { ApplicationDialog } from "./application-dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { mutationDeleteApplication } from "../hooks/mutation-delete-application";

interface ApplicationTableProps {
  applications: IApplication[];
}
export function ApplicationTable({ applications }: ApplicationTableProps) {
  const deleteMutation = mutationDeleteApplication();
  return (
    <Table>
      <TableHeader className="bg-accent">
        <TableRow>
          <TableHead className="text-lg">Título</TableHead>
          <TableHead className="text-lg">Empresa</TableHead>
          <TableHead className="text-lg">Salário</TableHead>
          <TableHead className="text-lg">Status</TableHead>
          <TableHead className="text-lg text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {applications.map((application: IApplication) => (
          <TableRow key={application.id}>
            <TableCell className="py-3 text-md">{application.title}</TableCell>
            <TableCell className="py-3 text-md">
              {application.company.name}
            </TableCell>
            <TableCell className="py-3 text-md">
              {formatCurrency(application.salary)}
            </TableCell>
            <TableCell className="py-3 text-md">
              {ApplicationStatusLabel[application.status]}
            </TableCell>
            <TableCell className="py-3 text-md text-center">
              <div className="flex justify-center gap-2">
                <ApplicationDialog
                  application={application}
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
                  deleteMutation={deleteMutation}
                  id={application.id}
                  title={application.title}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

