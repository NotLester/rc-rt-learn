import { useCallback, useState } from "react";

import useUpdateTodo from "../api/mutations/use-update-todo";
import { Todo } from "../types";

interface TodoCardProps {
  todo: Todo;
}

export default function TodoCard({ todo }: TodoCardProps) {
  const [isCompleted, setIsCompleted] = useState(todo.completed);

  const { isPending, mutate: toggleTodo } = useUpdateTodo();

  const handleToggle = useCallback(
    (todo: Todo) => {
      setIsCompleted((prev) => !prev);
      toggleTodo(
        { ...todo, completed: !todo.completed },
        { onError: () => setIsCompleted(() => todo.completed) }
      );
    },
    [toggleTodo]
  );

  return (
    <div
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-3 
                    transition-all duration-200 hover:shadow-lg
                    dark:shadow-gray-900/30"
    >
      <div className="flex items-center space-x-3">
        <div className="relative">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => handleToggle(todo)}
            disabled={isPending}
            className={`
              w-5 h-5 rounded border-2 cursor-pointer
              focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800
              disabled:cursor-not-allowed disabled:opacity-50
              transition-colors duration-200
              ${
                isCompleted
                  ? "bg-blue-500 dark:bg-blue-600 border-blue-500 dark:border-blue-600"
                  : "border-gray-300 dark:border-gray-600"
              }
            `}
          />
        </div>
        <h2
          className={`flex-1 text-lg font-medium transition-colors duration-200
          ${isPending ? "text-gray-400 dark:text-gray-500" : "text-gray-700 dark:text-gray-200"}
          ${isCompleted ? "line-through text-gray-400 dark:text-gray-500" : ""}
        `}
        >
          {todo.title}
        </h2>
      </div>
    </div>
  );
}
