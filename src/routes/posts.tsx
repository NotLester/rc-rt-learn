import { createFileRoute } from "@tanstack/react-router";

import useGetAllPosts, {
  getAllPostsQuery,
} from "../features/posts/api/queries/use-get-all-posts";

export const Route = createFileRoute("/posts")({
  component: () => <Posts />,
  loader: ({ context: { queryClient } }) => {
    queryClient.ensureQueryData(getAllPostsQuery());
  },
});

function Posts() {
  const { data: posts } = useGetAllPosts();

  if (!posts || !posts.length) {
    return <div>No posts available</div>;
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
        </div>
      ))}
    </div>
  );
}
