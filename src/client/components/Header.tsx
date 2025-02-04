import { Link, NavLink } from "react-router";

function Header() {
  return (
    <header className="h-15 flex items-center justify-between px-4 bg-gray-100 dark:bg-gray-900 rounded-2xl shadow-lg">
      <Link
        to="/"
        className="text-2xl font-bold focus:outline-2 dark:focus:outline-gray-700 focus:outline-gray-300 rounded-lg focus:outline-offset-2"
      >
        To-do App
      </Link>
      <nav className="flex gap-2 text-lg items-center">
        <NavLink
          to="/"
          className="dark:hover:bg-gray-800 hover:bg-gray-200 focus:outline-2 dark:focus:outline-gray-700 focus:outline-gray-300 px-2 py-1 rounded-lg"
        >
          Home
        </NavLink>
        <NavLink
          to="/create"
          className="dark:hover:bg-gray-800 hover:bg-gray-200 focus:outline-2 dark:focus:outline-gray-700 focus:outline-gray-300 px-2 py-1 rounded-lg"
        >
          Create
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
