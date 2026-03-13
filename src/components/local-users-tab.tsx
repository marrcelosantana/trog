import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { useDebounce } from "@/hooks/use-debounce";
import { useLocalUsersStore } from "@/stores/use-local-users-store";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { CardTable, CreateUserModal } from "@/components";

const LIMIT = 7;
const DEBOUNCE_MS = 400;

const LocalUsersTab: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const users = useLocalUsersStore((state) => state.users);
  const debouncedSearch = useDebounce(search, DEBOUNCE_MS);

  const filteredUsers = useMemo(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase();

    if (!normalizedSearch) {
      return users;
    }

    return users.filter((user) =>
      `${user.firstName} ${user.lastName}`
        .trim()
        .toLowerCase()
        .includes(normalizedSearch),
    );
  }, [debouncedSearch, users]);

  const paginatedUsers = useMemo(() => {
    const start = (page - 1) * LIMIT;
    return filteredUsers.slice(start, start + LIMIT);
  }, [filteredUsers, page]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / LIMIT));

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <div className="mt-4 flex flex-col gap-6 px-2">
      <header className="flex w-full items-center justify-between">
        <InputGroup className="max-w-xs">
          <InputGroupInput
            placeholder="Buscar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>

        <CreateUserModal isOpen={isOpen} onOpenChange={handleOpenChange} />
      </header>

      <CardTable
        users={paginatedUsers}
        hasActions
        pagination={{
          currentPage: page,
          totalPages,
          onPageChange: setPage,
        }}
      />
    </div>
  );
};

export default LocalUsersTab;
