import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { useDeleteTodo } from "@/hooks/useDeleteTodo";
import { useState } from "react";

export default function DeleteModal({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { removeTodo, isPendingDelete } = useDeleteTodo();

  function handleDelete() {
    removeTodo(
      { id },
      {
        onSettled: () => {
          setIsOpen(false);
        },
      }
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-100 dark:bg-gray-900 dark:text-gray-200 text-gray-800 border-solid border-gray-200 dark:border-gray-800">
        <DialogHeader className="mb-4">
          <DialogTitle>Delete to-do</DialogTitle>
          <DialogDescription className="text-gray-900/70 dark:text-gray-300/70">
            Are you sure you want to delete this permanently?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <button
            type="submit"
            className={`py-2 px-4 rounded-lg dark:bg-gray-800 bg-gray-200 dark:hover:bg-gray-700 hover:bg-gray-300 cursor-pointer focus:outline-2 dark:focus:outline-gray-700 focus:outline-gray-300 focus:outline-offset-2 ${
              isPendingDelete && "opacity-50 disabled:cursor-not-allowed"
            }`}
            disabled={isPendingDelete}
            onClick={() => setIsOpen(false)}
          >
            Close
          </button>
          <button
            type="submit"
            className={`py-2 px-4 rounded-lg bg-red-600 hover:bg-red-500 text-gray-100 cursor-pointer focus:outline-2 dark:focus:outline-gray-700 focus:outline-red-600 focus:outline-offset-2 ${
              isPendingDelete && "opacity-50 disabled:cursor-not-allowed"
            }`}
            disabled={isPendingDelete}
            onClick={handleDelete}
          >
            {isPendingDelete ? "Deleting..." : "Delete"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
