import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
} from "@/components/ui/table";
import { TableCell } from "@/components/ui/table";

export function TableSkeleton() {
  return (
    <div className="my-8 px-8">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="h-8 w-40" />
        <Skeleton className="h-10 w-52" />
      </div>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-accent">
            <TableRow>
              <TableHead className="text-lg">
                <Skeleton className="h-6 w-28" />
              </TableHead>
              <TableHead className="text-lg">
                <Skeleton className="h-6 w-28" />
              </TableHead>
              <TableHead className="text-lg">
                <Skeleton className="h-6 w-20" />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 6 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell className="py-3 text-md">
                  <Skeleton className="h-5 w-40" />
                </TableCell>
                <TableCell className="py-3 text-md">
                  <Skeleton className="h-5 w-20" />
                </TableCell>
                <TableCell className="py-3 text-md">
                  <div className="flex gap-2">
                    <Skeleton className="h-8 w-8 rounded" />
                    <Skeleton className="h-8 w-8 rounded" />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
