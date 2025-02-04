import { todoSchema } from "@/types/zod";
import toast from "react-hot-toast";
import { CustomZodError } from "./utils";

export async function getTodos() {
  try {
    const res = await fetch("http://localhost:3000/api/todo");
    const todos: FetchResult<Todos> = await res.json();

    if (todos.success) return todos.data;
    else throw new Error(todos.message);
  } catch (error) {
    console.log("error in getTodos: ", error);
    toast.error(
      error instanceof Error ? error.message : "Something went wrong."
    );
  }
}

export async function addTodo({ text }: { text: string }) {
  try {
    const parseResult = todoSchema.safeParse({ text });

    if (!parseResult.success)
      throw new CustomZodError(
        "Validation error",
        parseResult.error.flatten().fieldErrors?.text?.at(0)!
      );

    const res = await fetch("http://localhost:3000/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });
    const newTodo: FetchResult<string> = await res.json();

    if (newTodo.success) return newTodo.data;
    else throw new Error(newTodo.message);
  } catch (error) {
    console.log("error in addTodo: ", error);

    if (error instanceof CustomZodError)
      throw new CustomZodError(error.message, error.zodParsingError);
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("Something went wrong.");
  }
}

export async function updateTodo({
  id,
  text,
  finished,
}: {
  id: string;
  text: string;
  finished?: boolean;
}) {
  try {
    const parseResult = todoSchema.safeParse({ text });

    if (!parseResult.success)
      throw new CustomZodError(
        "Validation error",
        parseResult.error.flatten().fieldErrors?.text?.at(0)!
      );

    const res = await fetch(`http://localhost:3000/api/todo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, finished }),
    });
    const updatedTodo: FetchResult<string> = await res.json();

    if (updatedTodo.success) return updatedTodo.data;
    else throw new Error(updatedTodo.message);
  } catch (error) {
    console.log("error in updateTodo: ", error);

    if (error instanceof CustomZodError)
      throw new CustomZodError(error.message, error.zodParsingError);
    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("Something went wrong.");
  }
}

export async function deleteTodo({ id }: { id: string }) {
  try {
    const res = await fetch(`http://localhost:3000/api/todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deletedTodo: FetchResult<string> = await res.json();

    if (deletedTodo.success) return deletedTodo.data;
    else throw new Error(deletedTodo.message);
  } catch (error) {
    console.log("error in updateTodo: ", error);

    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("Something went wrong.");
  }
}
