import type { User } from "../user";

export type GetUsersResponse = {
  users: User[];
  total: number;
  skip: number;
  limit: number;
};

export type GetUserParams = {
  search?: string;
  limit?: number;
  skip?: number;
};
