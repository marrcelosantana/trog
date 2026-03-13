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

import { Pencil } from "lucide-react";
import { Button } from "./ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { useEffect } from "react";

interface EditUserModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const EditUserModal: React.FC<EditUserModalProps> = ({
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
        <Button variant="outline" size="icon" className="cursor-pointer">
          <Pencil />
        </Button>
      </DialogTrigger>
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
                Atualizar
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditUserModal;
