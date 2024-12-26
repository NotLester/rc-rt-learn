import { createFileRoute } from '@tanstack/react-router';

import { getAllTodosQuery } from '../features/todos/api/queries/use-get-all-todos';
import useGetTodoById from '../features/todos/api/queries/use-get-todo-by-id';

export const Route = createFileRoute("/todos/$todoId")({
  loader: async ({ context: { queryClient } }) => {
    await queryClient.ensureQueryData(getAllTodosQuery());
  },
  component: () => <TodoByIdPage />,
});

function TodoByIdPage() {
  const { todoId } = Route.useParams();
  const { todo } = useGetTodoById(parseInt(todoId));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        {todo ? (
          <>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              {todo.title}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Has completed:{" "}
              <span
                className={`font-medium ${
                  todo.completed
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {todo.completed ? "Yes" : "No"}
              </span>
            </p>
          </>
        ) : (
          <p className="text-center text-gray-500 dark:text-gray-400">
            Loading or Todo not found.
          </p>
        )}
      </div>
    </div>
  );
}
