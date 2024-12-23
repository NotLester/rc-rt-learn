import { createFileRoute } from "@tanstack/react-router";

import useGetPostById from "../features/posts/api/queries/use-get-post-by-id";

export const Route = createFileRoute("/posts/$postId")({
  component: () => <PostIdComponent />,
});

function PostIdComponent() {
  const { postId } = Route.useParams();
  const { post } = useGetPostById(parseInt(postId));

  console.log(post);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            The post you are looking for does not exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700">{post.body}</p>
    </div>
  );
}
