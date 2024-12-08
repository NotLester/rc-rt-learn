import { createFileRoute } from '@tanstack/react-router';

import useGetTodoById, { getTodoByIdQuery } from '../features/todos/api/queries/use-get-todo-by-id';

export const Route = createFileRoute("/todos/$todoId")({
  component: () => <TodoByIdPage />,
  loader: ({ context: { queryClient }, params }) => {
    queryClient.ensureQueryData(getTodoByIdQuery(parseInt(params.todoId)));
  },
});

function TodoByIdPage() {
  const { todoId } = Route.useParams();
  const { data: todo } = useGetTodoById(parseInt(todoId));

  return (
    <div>
      <h1>{todo?.title}</h1>
      <p>Has completed: {todo?.completed}</p>
    </div>
  );
}
