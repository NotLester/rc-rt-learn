import { createFileRoute } from "@tanstack/react-router";

import { getAllTodosQuery } from "../features/todos/api/queries/use-get-all-todos";
import useGetTodoById from "../features/todos/api/queries/use-get-todo-by-id";

export const Route = createFileRoute("/todos/$todoId")({
  component: () => <TodoByIdPage />,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(getAllTodosQuery());
  },
});

function TodoByIdPage() {
  const { todoId } = Route.useParams();
  const { todo } = useGetTodoById(parseInt(todoId));

  return (
    <div>
      <h1>{todo?.title}</h1>
      <p>Has completed: {todo?.completed}</p>
    </div>
  );
}
