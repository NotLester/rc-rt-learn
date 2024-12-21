import useGetAllTodos from "./use-get-all-todos";

export default function useGetTodoById(id: number) {
  const { todos } = useGetAllTodos();
  const requiredTodo = todos?.find((todo) => todo.id === id);
  return { todo: requiredTodo };
}
