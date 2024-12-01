import ky from "ky";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Todo } from "../../types";
import { getAllTodosQuery } from "../queries/use-get-all-todos";

export default function useUpdateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["update-todo"],
    mutationFn: (todo: Todo) => {
      return ky
        .put(`https://jsonplaceholder.typicode.com/todos/${todo.id}`, {
          json: todo,
        })
        .json<Todo>();
    },
    onSuccess: (updatedTodo) => {
      queryClient.setQueryData(
        getAllTodosQuery().queryKey,
        (oldTodos: Todo[] | undefined) => {
          return (
            oldTodos?.map((t) =>
              t.id === updatedTodo.id ? updatedTodo : t
            ) ?? [updatedTodo]
          );
        }
      );
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
}
