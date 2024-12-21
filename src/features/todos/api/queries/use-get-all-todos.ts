import ky from "ky";

import { queryOptions, useQuery } from "@tanstack/react-query";

import { Todo } from "../../types";

export const getAllTodosQuery = () => {
  return queryOptions({
    queryKey: ["todos"],
    queryFn: () => {
      return ky
        .get("https://jsonplaceholder.typicode.com/todos")
        .json<Todo[]>();
    },
  });
};

export default function useGetAllTodos() {
  const { data: todos, ...props } = useQuery(getAllTodosQuery());
  return { todos, ...props };
}
