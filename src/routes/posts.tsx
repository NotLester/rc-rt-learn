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
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
            No Posts Yet
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            Check back later for new posts
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/30 p-6 mb-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              Posts Feed
            </h1>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </span>
          </div>

          <div className="space-y-6">
            {posts.map((post) => (
              <article
                key={post.id}
                className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 
                          transition-all duration-200 group"
              >
                <h2
                  className="text-xl font-semibold text-gray-800 dark:text-white mb-3 
                             group-hover:text-blue-600 dark:group-hover:text-blue-400
                             transition-colors duration-200"
                >
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {post.body}
                </p>
                <div className="mt-4 flex items-center justify-end">
                  <button
                    className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 
                             dark:hover:text-blue-300 font-medium transition-colors duration-200"
                  >
                    Read more →
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
