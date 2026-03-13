import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { useGetUsers } from "@/queries/use-get-users";
import { Search } from "lucide-react";
import { CardTable } from "@/components";

const UsersTab: React.FC = () => {
  const { data: users } = useGetUsers({
    limit: 10,
    skip: 0,
  });

  return (
    <div className="mt-4 flex flex-col gap-6 px-2">
      <header className="flex w-full items-center justify-between">
        <InputGroup className="max-w-xs">
          <InputGroupInput placeholder="Buscar por nome..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>
      </header>
      <CardTable users={users?.users || []} />
    </div>
  );
};

export default UsersTab;
