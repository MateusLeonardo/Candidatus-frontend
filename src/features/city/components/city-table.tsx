"use client";
import { ICity } from "../types/city";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { CityDialog } from "./city-dialog";
import { useMutationDeleteCity } from "../hooks/use-mutation-delete-city";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";

interface CityTableProps {
  cities: ICity[];
}
export function CityTable({ cities }: CityTableProps) {
  const deleteCityMutation = useMutationDeleteCity();
  return (
    <Table>
      <TableHeader className="bg-accent">
        <TableRow>
          <TableHead className="text-lg">Nome</TableHead>
          <TableHead className="text-lg">Estado</TableHead>
          <TableHead className="text-lg text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cities.map((city: ICity) => (
          <TableRow key={city.id}>
            <TableCell className="py-3 text-md">{city.name}</TableCell>
            <TableCell className="py-3 text-md">{city.state.name}</TableCell>
            <TableCell className="py-3 text-md text-center">
              <div className="flex justify-center gap-2">
                <CityDialog
                  city={city}
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
                  deleteMutation={deleteCityMutation}
                  id={city.id}
                  title={city.name}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
