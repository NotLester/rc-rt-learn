import ky from "ky";

import { queryOptions } from "@tanstack/react-query";

import { Post } from "../../types.ts";

export const getPostByIdQuery = (id: number) => {
  return queryOptions({
    queryKey: ["posts", id.toString()],
    queryFn: () => {
      return ky
        .get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .json<Post>();
    },
  });
};
