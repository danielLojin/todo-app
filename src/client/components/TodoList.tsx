import ToDoCard from "./ToDoCard";

function TodoList({ orderedTodos }: { orderedTodos: Todo[] }) {
  return (
    <ul className="bg-gray-100 dark:bg-gray-900 py-4 px-6 rounded-lg shadow-lg grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[calc(100vh-14rem)] overflow-auto hide-scrollbar">
      {orderedTodos.map((todo) => (
        <ToDoCard key={todo._id} todo={todo} />
      ))}
    </ul>
  );
}

export default TodoList;
