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
      onClick={() => handleToggle(todo)}
      className="bg-white rounded-lg shadow-md p-4 mb-3 transition-all duration-200 hover:shadow-lg"
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
              focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              disabled:cursor-not-allowed disabled:opacity-50
              transition-colors duration-200
              ${isCompleted ? "bg-blue-500 border-blue-500" : "border-gray-300"}
            `}
          />
        </div>
        <h2
          className={`flex-1 text-lg font-medium transition-colors duration-200
          ${isPending ? "text-gray-400" : "text-gray-700"}
          ${isCompleted ? "line-through text-gray-400" : ""}
        `}
        >
          {todo.title}
        </h2>
      </div>
    </div>
  );
}
