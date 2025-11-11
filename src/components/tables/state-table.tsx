import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import { IState } from "@/types/state";
import { StateDialog } from "../dialogs/state-dialog";
import { useMutationDeleteState } from "@/hooks/queries/state/useMutationDeleteState";

interface StateTableProps {
  states: IState[];
}
export function StateTable({ states }: StateTableProps) {
  const deleteStateMutation = useMutationDeleteState();

  const handleDeleteState = (state: IState) => {
    deleteStateMutation.mutate(state.id);
  };
  return (
    <Table>
      <TableHeader className="bg-accent">
        <TableRow>
          <TableHead className="text-lg">Nome</TableHead>
          <TableHead className="text-lg">Sigla</TableHead>
          <TableHead className="text-lg">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {states.map((state: IState) => (
          <TableRow key={state.id}>
            <TableCell className="py-3 text-md">{state.name}</TableCell>
            <TableCell className="py-3 text-md">{state.uf}</TableCell>
            <TableCell className="py-3 text-md">
              <div className="flex gap-2">
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
                        Deseja realmente remover o estado "{state.name}"?
                      </AlertDialogTitle>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="cursor-pointer">
                        Cancelar
                      </AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDeleteState(state)}
                        className="cursor-pointer"
                      >
                        Remover
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
