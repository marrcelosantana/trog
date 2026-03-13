import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import {
  createUserSchema,
  type CreateUserSchema,
} from "@/schemas/create-user-schema";

import { useLocalUsersStore } from "@/stores/use-local-users-store";
import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

interface EditUserModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string | null;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
  isOpen,
  onOpenChange,
  userId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const users = useLocalUsersStore((state) => state.users);
  const updateUser = useLocalUsersStore((state) => state.updateUser);

  const user = useMemo(
    () => users.find((u) => u.id === userId) ?? null,
    [users, userId],
  );

  const editUserForm = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      city: "",
    },
  });

  const watchedValues = editUserForm.watch();

  const hasChanges = useMemo(() => {
    if (!user) return false;
    const fullName = `${user.firstName} ${user.lastName}`.trim();
    return (
      watchedValues.name !== fullName ||
      watchedValues.email !== user.email ||
      watchedValues.city !== user.address.city
    );
  }, [user, watchedValues]);

  const handleUpdateUser = editUserForm.handleSubmit(async (data) => {
    if (!userId) return;

    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1000));

    updateUser(userId, data);
    toast.success("Usuário atualizado com sucesso");
    setIsLoading(false);
    onOpenChange(false);
  });

  useEffect(() => {
    if (isOpen && user) {
      const fullName = `${user.firstName} ${user.lastName}`.trim();
      editUserForm.reset({
        name: fullName,
        email: user.email,
        city: user.address.city,
      });
      editUserForm.clearErrors();
    }
  }, [isOpen, user]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogOverlay />
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Atualizar usuário
          </DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para atualizar o usuário selecionado.
          </DialogDescription>
        </DialogHeader>

        <Form {...editUserForm}>
          <form className="flex flex-col gap-4" onSubmit={handleUpdateUser}>
            <FormField
              control={editUserForm.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Clique para preencher"
                        className="h-11 sm:h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={editUserForm.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Clique para preencher"
                        className="h-11 sm:h-12"
                        type="email"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              control={editUserForm.control}
              name="city"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Cidade</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Clique para preencher"
                        className="h-11 sm:h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <div className="mt-4 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="cursor-pointer"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="w-[120px] cursor-pointer disabled:cursor-not-allowed"
                disabled={isLoading || !hasChanges}
              >
                {isLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Atualizar"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
