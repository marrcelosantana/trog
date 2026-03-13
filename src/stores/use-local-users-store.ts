import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import type { CreateUserSchema } from "@/schemas/create-user-schema";
import type { User } from "@/types/user";

interface LocalUsersStore {
  users: User[];
  addUser: (data: CreateUserSchema) => void;
}

const getNameParts = (name: string) => {
  const [firstName, ...rest] = name.trim().split(" ");
  const lastName = rest.join(" ");

  return {
    firstName,
    lastName: lastName,
  };
};

const getUsernameFromEmail = (email: string) => {
  const username = email.split("@")[0];

  return username || "user";
};

export const useLocalUsersStore = create<LocalUsersStore>()(
  persist(
    (set) => ({
      users: [],
      addUser: (data) =>
        set((state) => {
          const { firstName, lastName } = getNameParts(data.name);
          const newUser: User = {
            id: uuidv4(),
            firstName,
            lastName,
            username: getUsernameFromEmail(data.email),
            email: data.email,
            phone: "",
            image: "",
            address: {
              city: data.city,
              state: "",
            },
          };

          return {
            users: [...state.users, newUser],
          };
        }),
    }),
    {
      name: "local-users-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
