import ky from "ky";

import { queryOptions, useQuery } from "@tanstack/react-query";

import { Post } from "../../types.ts";

export const getAllPostsQuery = () => {
  return queryOptions({
    queryKey: ["posts"],
    queryFn: () => {
      return ky
        .get("https://jsonplaceholder.typicode.com/posts")
        .json<Post[]>();
    },
  });
};

export default function useGetAllPosts() {
  return useQuery(getAllPostsQuery());
}
