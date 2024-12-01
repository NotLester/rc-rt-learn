import { useMutation, useQueryClient } from "@tanstack/react-query";

import kyInstance from "../../../../lib/ky";
import { Todo } from "../../types";
import { getAllTodosQuery } from "../queries/use-get-all-todos";

export default function useDeleteTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["delete-todo"],
    mutationFn: (id: number) => {
      return kyInstance.delete(`/todos/${id}`).json<Todo>();
    },
    onSuccess: (deletedTodo) => {
      queryClient.setQueryData(
        getAllTodosQuery().queryKey,
        (oldTodos: Todo[] | undefined) => {
          return oldTodos?.filter((todo) => todo.id !== deletedTodo.id) ?? [];
        }
      );
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
}
