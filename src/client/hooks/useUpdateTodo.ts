import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateTodo } from "../utils/queryFunctions";
import { CustomZodError } from "@/utils/utils";

export function useUpdateTodo() {
  const queryClient = useQueryClient();

  const { mutate: editTodo, isPending: isPendingEdit } = useMutation({
    mutationFn: updateTodo,
    onMutate: async ({ id, text, finished }) => {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(["todos"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["todos"], (old: Todos) =>
        old.map((todo) => {
          if (todo._id === id)
            return { ...todo, text, finished, changing: true };
          return todo;
        })
      );

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    onSuccess: () => {
      toast.success("To-do successfully updated.");
    },
    onError: (err, _newTodo, context) => {
      if (err instanceof CustomZodError) return;
      queryClient.setQueryData(["todos"], context?.previousTodos);

      toast.error(err.message);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return { editTodo, isPendingEdit };
}
