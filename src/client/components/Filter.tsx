import { useState } from "react";
import { Link } from "react-router";

type ButtonOption = "all" | "active" | "finished";

function Filter({ activeFilter }: { activeFilter: string }) {
  const [selected, setSelected] = useState<ButtonOption>(
    activeFilter as ButtonOption
  );

  function handleSelect(option: ButtonOption) {
    setSelected(option);
  }

  return (
    <div className="inline-flex rounded-md shadow-sm mb-3" role="group">
      <Button option="all" selected={selected} handleSelect={handleSelect}>
        All
      </Button>
      <Button option="active" selected={selected} handleSelect={handleSelect}>
        Active
      </Button>
      <Button option="finished" selected={selected} handleSelect={handleSelect}>
        Finished
      </Button>
    </div>
  );
}

function Button({
  option,
  selected,
  handleSelect,
  children,
}: {
  option: ButtonOption;
  selected: ButtonOption;
  handleSelect: (option: ButtonOption) => void;
  children: React.ReactNode;
}) {
  let borderStyles: string;

  if (option === "all") {
    borderStyles = "border-2 rounded-l-lg";
  } else if (option === "active") {
    borderStyles = "border-t-2 border-b-2";
  } else {
    borderStyles = "border-2 rounded-r-lg";
  }

  return (
    <Link to={`?filter=${option}`} onClick={() => handleSelect(option)}>
      <button
        type="button"
        className={`px-4 py-2 text-sm font-medium border-gray-100 dark:border-gray-900 cursor-pointer ${borderStyles} ${
          selected === option
            ? "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
            : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
        }`}
      >
        {children}
      </button>
    </Link>
  );
}

export default Filter;
