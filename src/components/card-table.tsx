import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import type { User } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { CardTablePagination, DeleteUserModal } from "@/components";
import { Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

interface CardTableProps {
  users: User[];
  pagination?: PaginationProps;
  hasActions?: boolean;
}

const EMPTY_STATE_MESSAGE = "Sem resultados por enquanto.";

const CardTable: React.FC<CardTableProps> = ({
  users,
  pagination,
  hasActions,
}) => {
  const isEmpty = users.length === 0;

  const [deleteUserModalIsOpen, setDeleteUserModalIsOpen] = useState(false);

  const handleDeleteUserModalOpenChange = (open: boolean) => {
    setDeleteUserModalIsOpen(open);
  };

  return (
    <>
      <div className="max-h-[50vh] overflow-y-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Cidade</TableHead>
              {hasActions && <TableHead>Ações</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isEmpty ? (
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="text-muted-foreground h-24 text-center"
                >
                  {EMPTY_STATE_MESSAGE}
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="flex items-center gap-2 font-medium">
                    <Avatar>
                      <AvatarImage src={user.image} />
                      <AvatarFallback>
                        {user.firstName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span>
                      {user.firstName} {user.lastName}
                    </span>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.address.city}</TableCell>
                  {hasActions && (
                    <TableCell className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="cursor-pointer"
                      >
                        <Pencil />
                      </Button>
                      <DeleteUserModal
                        isOpen={deleteUserModalIsOpen}
                        onOpenChange={handleDeleteUserModalOpenChange}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && (
        <CardTablePagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          onPageChange={pagination.onPageChange}
        />
      )}
    </>
  );
};

export default CardTable;
