import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../utils/queryFunctions";

export function useGetTodos() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  return { isPending, isError, data, error };
}
