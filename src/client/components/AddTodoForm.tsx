import { useState } from "react";
import { useCreateTodo } from "../hooks/useCreateTodo";
import { useNavigate } from "react-router";
import { CustomZodError } from "@/utils/utils";

function AddTodoForm() {
  const [todoText, setTodoText] = useState<string>("");
  const [validationError, setValidationError] = useState<string>("");
  const { createTodo, isPendingCreate } = useCreateTodo();
  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    createTodo(
      { text: todoText },
      {
        onSuccess: () => {
          setTodoText("");
          navigate("/");
        },
        onError: (err) => {
          if (err instanceof CustomZodError)
            setValidationError(err.zodParsingError);
        },
      }
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 max-w-[350px] mx-auto py-4 px-6 rounded-lg shadow-lg ">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <label htmlFor="todo-textarea" className="text-lg">
          Add to-do
        </label>
        <textarea
          name="todo-textarea"
          id="todo-textarea"
          rows={5}
          className={`border border-gray-300 dark:border-gray-700 rounded-lg  p-2 mt-2 focus:outline-2 dark:focus:outline-gray-700 focus:outline-gray-300 focus:outline-offset-2 ${
            validationError &&
            "border-red-500 dark:border-red-500 focus:outline-red-500 dark:focus:outline-red-500"
          }`}
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
        ></textarea>
        {validationError && (
          <p className="text-sm text-red-500">{validationError}</p>
        )}
        <button
          type="submit"
          disabled={isPendingCreate}
          className={`mt-4 py-2 rounded-lg dark:bg-gray-800 bg-gray-200 dark:hover:bg-gray-700 hover:bg-gray-300 cursor-pointer focus:outline-2 dark:focus:outline-gray-700 focus:outline-gray-300 focus:outline-offset-2 ${
            isPendingCreate && "opacity-50 disabled:cursor-not-allowed"
          }`}
        >
          {isPendingCreate ? "Adding..." : "Add"}
        </button>
      </form>
    </div>
  );
}

export default AddTodoForm;
