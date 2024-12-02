import { useCallback, useState } from "react";

import { createFileRoute } from "@tanstack/react-router";

import useCreateTodo from "../features/todos/api/mutations/use-create-todo.ts";
import useUpdateTodo from "../features/todos/api/mutations/use-update-todo.ts";
import {
  getAllTodosQuery,
  useGetAllTodos,
} from "../features/todos/api/queries/use-get-all-todos.ts";
import {
  TodoCard,
  TodoFilters,
  TodoInputForm,
} from "../features/todos/components";
import { Todo, TodoFilter } from "../features/todos/types.ts";

export const Route = createFileRoute("/todos")({
  component: () => <Todos />,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(getAllTodosQuery());
  },
});

function Todos() {
  const [filter, setFilter] = useState<TodoFilter>("all");

  const { data: todos } = useGetAllTodos();
  const { mutate: createTodo } = useCreateTodo();
  const { isPending: isTogglingTodo, mutate: toggleTodo } = useUpdateTodo();

  const canRender = useCallback(
    (todo: Todo) => {
      if (filter === "complete") return todo.completed;
      if (filter === "incomplete") return !todo.completed;
      return true;
    },
    [filter]
  );

  if (!todos || !todos.length) {
    return <div>No todos available</div>;
  }

  return (
    <>
      <TodoInputForm createNewTodo={createTodo} />
      <TodoFilters handleChange={setFilter} checkedFilter={filter} />
      {todos.map(
        (todo) =>
          canRender(todo) && (
            <div key={todo.id}>
              <TodoCard
                todo={todo}
                toggleTodo={toggleTodo}
                disabled={isTogglingTodo}
              />
            </div>
          )
      )}
    </>
  );
}
