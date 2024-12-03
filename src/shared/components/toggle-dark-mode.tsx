import { Moon, Sun } from "lucide-react";

import { useDarkMode } from "../../contexts/dark-mode-provider";

export default function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 
                text-gray-600 dark:text-gray-400 
                hover:bg-gray-200 dark:hover:bg-gray-700
                transition-colors duration-200"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        <Sun size={20} className="text-yellow-500" />
      ) : (
        <Moon size={20} className="text-gray-600" />
      )}
    </button>
  );
}
