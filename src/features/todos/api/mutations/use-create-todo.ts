import ky from "ky";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Todo } from "../../types";
import { getAllTodosQuery } from "../queries/use-get-all-todos";

export default function useCreateTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["create-todo"],
    mutationFn: (todo: Todo) => {
      return ky
        .post(`https://jsonplaceholder.typicode.com/todos`, {
          json: todo,
        })
        .json<Todo>();
    },
    onSuccess: (newTodo) => {
      queryClient.setQueryData(
        getAllTodosQuery().queryKey,
        (oldTodos: Todo[] | undefined) => {
          return oldTodos ? [newTodo, ...oldTodos] : [newTodo];
        }
      );
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
}
