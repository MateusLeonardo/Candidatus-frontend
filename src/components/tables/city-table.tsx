"use client";
import { ICity } from "@/types/city";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Table } from "../ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Pencil, Trash } from "lucide-react";
import { CityDialog } from "../dialogs/city-dialog";
import { useMutationDeleteCity } from "@/hooks/queries/city/useMutationDeleteCity";

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
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="cursor-pointer"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Deseja realmente remover a cidade "{city.name}"?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="cursor-pointer">
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction
                        className="cursor-pointer"
                        onClick={() => deleteCityMutation.mutate(city.id)}
                        disabled={deleteCityMutation.isPending}
                      >
                        {deleteCityMutation.isPending
                          ? "Removendo..."
                          : "Remover"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
