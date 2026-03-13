import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";

import { useLocalUsersStore } from "@/stores/use-local-users-store";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface DeleteUserModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string | null;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({
  isOpen,
  onOpenChange,
  userId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const deleteUser = useLocalUsersStore((state) => state.deleteUser);

  const handleConfirm = async () => {
    if (userId) {
      setIsLoading(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));

      deleteUser(userId);
      setIsLoading(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogOverlay />
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Deletar usuário
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <p>Tem certeza que deseja deletar este usuário selecionado?</p>
          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              onClick={handleConfirm}
              className="w-[120px] cursor-pointer disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Confirmar"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserModal;
