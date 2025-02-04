import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/Dialog";
import { useUpdateTodo } from "@/hooks/useUpdateTodo";
import { CustomZodError } from "@/utils/utils";
import { useEffect, useState } from "react";

export default function EditModal({
  children,
  text,
  finished,
  id,
}: {
  children: React.ReactNode;
  text: string;
  finished: boolean;
  id: string;
}) {
  const [todo, setTodo] = useState<{ text: string; finished: boolean }>({
    text,
    finished,
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [validationError, setValidationError] = useState<string>("");
  const { editTodo, isPendingEdit } = useUpdateTodo();

  function handleEdit() {
    editTodo(
      { id, ...todo },
      {
        onError: (err) => {
          if (err instanceof CustomZodError) {
            setValidationError(err.zodParsingError);
          }
        },
        onSuccess: () => {
          setIsOpen(false);
          setTodo({ text, finished });
          setValidationError("");
        },
      }
    );
  }

  useEffect(() => {
    if (!isOpen && validationError) setValidationError("");
    if (!isOpen && (todo.text !== text || todo.finished !== finished))
      setTodo({ text, finished });
  }, [isOpen, validationError, todo.text, text, finished]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-gray-100 dark:bg-gray-900 dark:text-gray-200 text-gray-800 border-solid border-gray-200 dark:border-gray-800">
        <DialogHeader>
          <DialogTitle>Edit to-do</DialogTitle>
          <DialogDescription className="text-gray-900/70 dark:text-gray-300/70">
            Make changes to your to-do. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-2">
          <div className="grid grid-cols-4 items-center gap-y-1 gap-x-2">
            <label htmlFor="text" className="text-right">
              Text
            </label>
            <input
              id="text"
              value={todo.text}
              onChange={(e) => setTodo({ ...todo, text: e.target.value })}
              className={`col-span-3 border border-gray-300 dark:border-gray-700 rounded-lg  p-2 focus:outline-2 dark:focus:outline-gray-700 focus:outline-gray-300 focus:outline-offset-2 ${
                validationError &&
                "border-red-500 focus:outline-red-500 dark:border-red-500 dark:focus:outline-red-500 "
              }`}
            />
            {validationError && (
              <p className="col-span-3 text-sm text-red-500 col-start-2 col-end-5">
                {validationError}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-2">
            <label htmlFor="finished" className="text-right">
              Finished
            </label>
            <input
              type="checkbox"
              id="finished"
              className="justify-self-start focus:outline-2 dark:focus:outline-gray-700 focus:outline-gray-300 focus:outline-offset-2"
              checked={todo.finished}
              onChange={(e) => setTodo({ ...todo, finished: e.target.checked })}
              disabled={isPendingEdit}
            />
          </div>
        </div>
        <DialogFooter>
          <button
            type="submit"
            className={`py-2 px-4 rounded-lg dark:bg-gray-800 bg-gray-200 dark:hover:bg-gray-700 hover:bg-gray-300 cursor-pointer focus:outline-2 dark:focus:outline-gray-700 focus:outline-gray-300 focus:outline-offset-2 ${
              isPendingEdit && "opacity-50 disabled:cursor-not-allowed"
            }`}
            onClick={handleEdit}
            disabled={isPendingEdit}
          >
            {isPendingEdit ? "Saving..." : "Save changes"}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
