import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

import { Search } from "lucide-react";
import { useState } from "react";
import { CardTable, CreateUserModal } from "@/components";

const users: any = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    address: {
      city: "New York",
    },
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    address: {
      city: "Los Angeles",
    },
  },
];

const LocalUsersTab: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <div className="mt-4 flex flex-col gap-6 px-2">
      <header className="flex w-full items-center justify-between">
        <InputGroup className="max-w-xs">
          <InputGroupInput placeholder="Buscar por nome..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>

        <CreateUserModal isOpen={isOpen} onOpenChange={handleOpenChange} />
      </header>

      <CardTable users={users} />
    </div>
  );
};

export default LocalUsersTab;
