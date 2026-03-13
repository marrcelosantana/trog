import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Plus, Search } from "lucide-react";
import { Button } from "./ui/button";

const LocalUsersTab: React.FC = () => {
  return (
    <div className="mt-4 flex flex-col gap-6 px-2">
      <header className="flex w-full items-center justify-between">
        <InputGroup className="max-w-xs">
          <InputGroupInput placeholder="Buscar por nome..." />
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
        </InputGroup>

        <Button className="flex cursor-pointer items-center gap-2">
          <Plus />
          Adicionar usuário
        </Button>
      </header>
    </div>
  );
};

export default LocalUsersTab;
