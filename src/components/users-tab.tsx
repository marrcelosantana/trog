import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { useDebounce } from "@/hooks/use-debounce";
import { useGetUsers } from "@/queries/use-get-users";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { CardTable, CardTableSkeleton } from "@/components";

const LIMIT = 7;
const DEBOUNCE_MS = 400;

const UsersTab: React.FC = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, DEBOUNCE_MS);

  const { data, isPending } = useGetUsers({
    limit: LIMIT,
    skip: (page - 1) * LIMIT,
    search: debouncedSearch || undefined,
  });

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);

  const totalPages = data?.total ? Math.ceil(data.total / LIMIT) : 1;

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
      </header>
      {isPending ? (
        <CardTableSkeleton />
      ) : (
        <CardTable
          users={data?.users || []}
          pagination={{
            currentPage: page,
            totalPages,
            onPageChange: setPage,
          }}
        />
      )}
    </div>
  );
};

export default UsersTab;
