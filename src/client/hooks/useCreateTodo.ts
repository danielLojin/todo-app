import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "../utils/queryFunctions";
import toast from "react-hot-toast";
import { CustomZodError } from "@/utils/utils";
import { todoSchema } from "@/types/zod";
import { useNavigate } from "react-router";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  const { mutate: createTodo, isPending: isPendingCreate } = useMutation({
    mutationFn: addTodo,
    onMutate: async ({ text }: { text: string }) => {
      const validationResult = todoSchema.safeParse({ text });
      if (!validationResult.success) return;

      await queryClient.cancelQueries({ queryKey: ["todos"] });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(["todos"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["todos"], (old: Todos) => [
        // in case this is the first todo, we need to provide default array
        ...(old || []),
        // temporary fake data
        {
          text,
          finished: false,
          changing: true,
          _id: Math.random.toString(),
          createdAt: new Date().toISOString(),
        },
      ]);

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    onSuccess: () => {
      toast.success("To-do successfully created.");
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

  return { createTodo, isPendingCreate };
}
