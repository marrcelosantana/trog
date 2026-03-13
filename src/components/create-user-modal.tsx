import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
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

import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { useEffect } from "react";

interface CreateUserModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const CreateUserModal: React.FC<CreateUserModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const createUserForm = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      city: "",
    },
  });

  const handleCreateUser = createUserForm.handleSubmit(async (data) => {
    console.log(data);
  });

  useEffect(() => {
    if (isOpen) {
      createUserForm.reset();
      createUserForm.clearErrors();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="flex cursor-pointer items-center gap-2">
          <Plus />
          Adicionar usuário
        </Button>
      </DialogTrigger>
      <DialogOverlay />
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Adicionar usuário
          </DialogTitle>
          <DialogDescription>
            Preencha os campos abaixo para adicionar um novo usuário.
          </DialogDescription>
        </DialogHeader>

        <Form {...createUserForm}>
          <form className="flex flex-col gap-4" onSubmit={handleCreateUser}>
            <FormField
              control={createUserForm.control}
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
              control={createUserForm.control}
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
              control={createUserForm.control}
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
              <Button type="submit" className="cursor-pointer">
                Adicionar usuário
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateUserModal;
