import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteTodo } from "../utils/queryFunctions";

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  const { mutate: removeTodo, isPending: isPendingDelete } = useMutation({
    mutationFn: deleteTodo,
    onMutate: async ({ id }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(["todos"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["todos"], (old: Todos) =>
        old.filter((todo) => todo._id !== id)
      );

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    onSuccess: () => {
      toast.success("To-do successfully deleted.");
    },
    onError: (err, _newTodo, context) => {
      queryClient.setQueryData(["todos"], context?.previousTodos);

      toast.error(err.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return { removeTodo, isPendingDelete };
}
