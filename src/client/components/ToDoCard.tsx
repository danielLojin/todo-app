import { Pencil, Trash2 } from "lucide-react";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

function ToDoCard({ todo }: { todo: Todo }) {
  const { text, finished, _id, changing } = todo;

  return (
    <li className="group flex justify-between items-center p-4 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg">
      <p
        className={`${
          finished && "text-gray-300 dark:text-gray-500 italic line-through"
        } ${changing && finished === false && "opacity-30"}`}
      >
        {text}
      </p>

      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex">
        <EditModal text={text} finished={finished} id={_id}>
          <button
            disabled={changing}
            className="p-1 text-gray-500 dark:text-gray-400 cursor-pointer disabled:cursor-not-allowed"
          >
            <Pencil size={20} />
          </button>
        </EditModal>

        <DeleteModal id={_id}>
          <button
            disabled={changing}
            className="p-1 cursor-pointer disabled:cursor-not-allowed"
          >
            <Trash2 size={20} className="text-red-500" />
          </button>
        </DeleteModal>
      </div>
    </li>
  );
}

export default ToDoCard;
