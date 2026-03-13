import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface CardTableSkeletonProps {
  rows?: number;
}

const CardTableSkeleton: React.FC<CardTableSkeletonProps> = ({ rows = 8 }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Cidade</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: rows }).map((_, index) => (
          <TableRow key={`skeleton-row-${index}`}>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="bg-muted h-9 w-9 animate-pulse rounded-full" />
                <div className="bg-muted h-4 w-36 animate-pulse rounded" />
              </div>
            </TableCell>
            <TableCell>
              <div className="bg-muted h-4 w-52 animate-pulse rounded" />
            </TableCell>
            <TableCell>
              <div className="bg-muted h-4 w-28 animate-pulse rounded" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default CardTableSkeleton;
