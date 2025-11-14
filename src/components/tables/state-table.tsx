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
import { IState } from "@/types/state";
import { StateDialog } from "../dialogs/state-dialog";
import { useMutationDeleteState } from "@/hooks/queries/state/useMutationDeleteState";
import { ConfirmDialog } from "../dialogs/confirm-dialog";

interface StateTableProps {
  states: IState[];
}
export function StateTable({ states }: StateTableProps) {
  const deleteStateMutation = useMutationDeleteState();

  return (
    <Table>
      <TableHeader className="bg-accent">
        <TableRow>
          <TableHead className="text-lg">Nome</TableHead>
          <TableHead className="text-lg">Sigla</TableHead>
          <TableHead className="text-lg text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {states.map((state: IState) => (
          <TableRow key={state.id}>
            <TableCell className="py-3 text-md">{state.name}</TableCell>
            <TableCell className="py-3 text-md">{state.uf}</TableCell>
            <TableCell className="py-3 text-md text-center">
              <div className="flex justify-center gap-2">
                <StateDialog
                  state={state}
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
               <ConfirmDialog deleteMutation={deleteStateMutation} id={state.id} title={state.name} />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
