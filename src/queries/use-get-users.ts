import type { GetUserParams } from "@/types/http/get-users";
import { getUsers } from "@/services/get-users";
import { useQuery } from "@tanstack/react-query";
import { QUERIES_KEYS } from "@/consts/query-keys";

export const useGetUsers = (params: GetUserParams) => {
  return useQuery({
    queryKey: [QUERIES_KEYS.USERS, params],
    queryFn: () => getUsers(params),
  });
};
