import ky from "ky";

import { queryOptions, useQuery } from "@tanstack/react-query";

import { Todo } from "../../types";

export const getTodoByIdQuery = (id: number) => {
  return queryOptions({
    queryKey: ["todos", id],
    queryFn: () => {
      return ky
        .get(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .json<Todo>();
    },
  });
};

export default function useGetTodoById(id: number) {
  return useQuery(getTodoByIdQuery(id));
}
