import { getUsers } from "@/services/get-users";
import { useQuery } from "@tanstack/react-query";
import type { GetUserParams } from "@/types/http/get-users";

export const useGetUsers = (params: GetUserParams) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getUsers(params),
  });
};
