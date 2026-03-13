import { api } from "@/lib/api";
import type { GetUserParams, GetUsersResponse } from "@/types/http/get-users";

export const getUsers = async (params: GetUserParams) => {
  const response = await api.get<GetUsersResponse>("/users", { params });
  return response.data;
};
