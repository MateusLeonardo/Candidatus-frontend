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
import { IPlatform } from "../types/platform";
import { mutationDeletePlatform } from "../hooks/mutation-delete-platform";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { PlatformDialog } from "./platform-dialog";

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
