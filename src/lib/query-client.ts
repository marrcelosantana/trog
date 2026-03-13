import { QueryClient, QueryCache } from "@tanstack/react-query";
import { toast } from "sonner";
import { getErrorMessage } from "./api-error";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  }),
});
