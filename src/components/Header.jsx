import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", !darkMode);
  };

  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setDarkMode(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center text-black dark:text-white">
        <h1 className="text-xl sm:text-2xl font-bold">MyShop</h1>

        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:text-blue-500 transition">
            Home
          </Link>
          <Link to="/cart" className="hover:text-blue-500 transition">
            Cart
          </Link>
          <button
            onClick={toggleDarkMode}
            className="ml-4 px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        <div className="md:hidden flex items-center space-x-4">
          <button onClick={toggleDarkMode}>
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {menuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 px-4 py-2 space-y-2 text-black dark:text-white">
          <Link
            to="/"
            className="block hover:text-blue-500"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/cart"
            className="block hover:text-blue-500"
            onClick={() => setMenuOpen(false)}
          >
            Cart
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Header;
