import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1, { message: "Nome é obrigatório" }),
  email: z
    .string()
    .email({ message: "Email inválido" })
    .min(1, { message: "Email é obrigatório" }),
  city: z.string().min(1, { message: "Cidade é obrigatória" }),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
