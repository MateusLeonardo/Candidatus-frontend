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
import { StateDialog } from "../state/state-dialog";
import { mutationDeleteState } from "@/hooks/queries/state/mutation-delete-state";
import { ConfirmDialog } from "../dialogs/confirm-dialog";
import { IPlatform } from "@/types/platform";
import { mutationDeletePlatform } from "@/hooks/queries/platform/mutation-delete-platform";
import { PlatformDialog } from "../platform/platform-dialog";

interface PlatformTableProps {
  platforms: IPlatform[];
}
export function PlatformTable({ platforms }: PlatformTableProps) {
  const deletePlatformMutation = mutationDeletePlatform();

  return (
    <Table>
      <TableHeader className="bg-accent">
        <TableRow>
          <TableHead className="text-lg">Nome</TableHead>
          <TableHead className="text-lg">URL</TableHead>
          <TableHead className="text-lg text-center">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {platforms.map((platform: IPlatform) => (
          <TableRow key={platform.id}>
            <TableCell className="py-3 text-md">{platform.name}</TableCell>
            <TableCell className="py-3 text-md">{platform.url}</TableCell>
            <TableCell className="py-3 text-md text-center">
              <div className="flex justify-center gap-2">
                <PlatformDialog
                  platform={platform}
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
                  deleteMutation={deletePlatformMutation}
                  id={platform.id}
                  title={platform.name}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
