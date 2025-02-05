import { todoSchema } from "@/types/zod";
import toast from "react-hot-toast";
import { CustomZodError } from "./utils";
import axios from "axios";

export async function getTodos() {
  try {
    const axiosRes = await axios.get("/api/todo");
    const todos: FetchResult<Todos> = axiosRes.data;

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

    const axiosRes = await axios.post(
      "/api/todo",
      { text },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const newTodo: FetchResult<string> = axiosRes.data;

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

    const axiosRes = await axios.put(
      `/api/todo/${id}`,
      { id, text, finished },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const updatedTodo: FetchResult<string> = axiosRes.data;

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
    const axiosRes = await axios.delete(`/api/todo/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deletedTodo: FetchResult<string> = axiosRes.data;

    if (deletedTodo.success) return deletedTodo.data;
    else throw new Error(deletedTodo.message);
  } catch (error) {
    console.log("error in updateTodo: ", error);

    if (error instanceof Error) throw new Error(error.message);
    else throw new Error("Something went wrong.");
  }
}
