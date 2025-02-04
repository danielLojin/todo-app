import { Link, useNavigate, useSearchParams } from "react-router";
import { GridLoader } from "react-spinners";
import { useGetTodos } from "../hooks/useGetTodos";

import Filter from "@/components/Filter";
import Heading from "../components/Heading";
import TodoList from "../components/TodoList";
import { useEffect } from "react";

function HomePage() {
  const { isPending, isError, data, error } = useGetTodos();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const activeFilter = searchParams.get("filter") ?? "all";

  // filtering for active/finished todos
  let filteredTodos: typeof data = [];
  if (activeFilter === "all") filteredTodos = data;
  if (activeFilter === "active")
    filteredTodos = data?.filter((todo) => !todo.finished);
  if (activeFilter === "finished")
    filteredTodos = data?.filter((todo) => todo.finished);

  useEffect(() => {
    if (filteredTodos?.length === 0) navigate("/?filter=all");
  }, [filteredTodos]);

  const orderedTodos = filteredTodos
    ?.slice()
    .sort(
      (a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))
    )
    .sort((a, b) => Number(a.finished) - Number(b.finished));

  return (
    <main className="py-8 px-4 w-full">
      <Heading>To-do list</Heading>

      {isPending ? (
        <div className="flex justify-center items-center">
          <GridLoader color="#6b7280" />
        </div>
      ) : isError ? (
        <p className="text-center text-xl">
          Something went wrong: {error?.message}
        </p>
      ) : orderedTodos && orderedTodos?.length > 0 ? (
        <>
          <Filter activeFilter={activeFilter} />
          <TodoList orderedTodos={orderedTodos} />
        </>
      ) : (
        <p className="text-center text-xl">
          No todos found. You can add new todos
          <Link to="/create" className="text-blue-500 hover:underline italic">
            {" "}
            here
          </Link>
        </p>
      )}
    </main>
  );
}

export default HomePage;
