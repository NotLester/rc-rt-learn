import useGetAllPosts from "./use-get-all-posts.ts";

export default function useGetPostById(id: number) {
  const { posts } = useGetAllPosts();
  const requiredPost = posts?.find((post) => post.id === id);
  return { post: requiredPost };
}
