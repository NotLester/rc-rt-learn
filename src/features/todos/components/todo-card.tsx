import { useCallback, useState } from "react";

import { UseMutateFunction } from "@tanstack/react-query";

import { Todo } from "../types";

interface TodoCardProps {
  todo: Todo;
  disabled: boolean;
  toggleTodo: UseMutateFunction<Todo, Error, Todo, unknown>;
}
export default function TodoCard({
  todo,
  disabled,
  toggleTodo,
}: TodoCardProps) {
  const [isCompleted, setIsCompleted] = useState(todo.completed);

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
    <>
      <div>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => handleToggle(todo)}
          disabled={disabled}
        />
        <h2>{todo.title}</h2>
      </div>
    </>
  );
}
