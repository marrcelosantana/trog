import { api } from "@/lib/api";
import type { GetUserParams, GetUsersResponse } from "@/types/http/get-users";

export const getUsers = async (params: GetUserParams) => {
  const { search, limit, skip } = params;

  if (search) {
    const response = await api.get<GetUsersResponse>("/users/search", {
      params: { q: search, limit, skip },
    });
    return response.data;
  }

  const response = await api.get<GetUsersResponse>("/users", {
    params: { limit, skip },
  });
  return response.data;
};
