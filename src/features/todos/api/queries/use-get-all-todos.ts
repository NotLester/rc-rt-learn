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

export const useGetAllTodos = () => useQuery(getAllTodosQuery());
