import { useCallback, useState } from "react";

import { createFileRoute } from "@tanstack/react-router";

import useGetAllTodos, {
  getAllTodosQuery,
} from "../features/todos/api/queries/use-get-all-todos.ts";
import {
  TodoCard,
  TodoFilters,
  TodoInputForm,
} from "../features/todos/components";
import { Todo, TodoFilter } from "../features/todos/types.ts";

export const Route = createFileRoute("/todos")({
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(getAllTodosQuery());
  },
  component: () => <Todos />,
});

function Todos() {
  const [filter, setFilter] = useState<TodoFilter>("all");
  const { todos } = useGetAllTodos();

  const canRender = useCallback(
    (todo: Todo) => {
      if (filter === "complete") return todo.completed;
      if (filter === "incomplete") return !todo.completed;
      return true;
    },
    [filter]
  );

  if (!todos || !todos.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
            No Todos Yet
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Start by creating your first todo!
          </p>
          <TodoInputForm />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/30 p-6 mb-8">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
            My Todos
          </h1>

          <div className="space-y-6">
            {/* Todo Input Section */}
            <section className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-4">
                Add New Todo
              </h2>
              <TodoInputForm />
            </section>

            {/* Filters Section */}
            <section className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  Filter Todos
                </h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {todos.length} {todos.length === 1 ? "todo" : "todos"}
                </span>
              </div>
              <TodoFilters handleChange={setFilter} checkedFilter={filter} />
            </section>

            {/* Todos List Section */}
            <section className="space-y-4">
              <div className="grid gap-4">
                {todos.map(
                  (todo) =>
                    canRender(todo) && (
                      <div
                        key={todo.id}
                        className="transition-all duration-200 hover:translate-x-1"
                      >
                        <TodoCard todo={todo} />
                      </div>
                    )
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
