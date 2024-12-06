import { createFileRoute } from '@tanstack/react-router';

import useGetAllPosts, { getAllPostsQuery } from '../features/posts/api/queries/use-get-all-posts';

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 mx-auto mb-4 text-gray-300 dark:text-gray-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-700 dark:text-gray-200">
            No Posts Yet
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Be the first one to create a post!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 py-12 transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl dark:shadow-gray-900/30 p-8">
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Posts Feed
            </h1>
            <span className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full text-sm font-medium text-gray-600 dark:text-gray-300">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </span>
          </div>

          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.id}
                className="group relative p-8 bg-gray-50 dark:bg-gray-700/50 rounded-xl 
                          hover:bg-white dark:hover:bg-gray-700 
                          transform hover:-translate-y-1 
                          transition-all duration-300 ease-in-out
                          shadow-sm hover:shadow-md dark:shadow-gray-900/10"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <h2
                  className="text-2xl font-bold text-gray-800 dark:text-white mb-4 
                             group-hover:text-blue-600 dark:group-hover:text-blue-400
                             transition-colors duration-200"
                >
                  {post.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                  {post.body}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date().toLocaleDateString()}
                    </span>
                  </div>
                  <button
                    className="group/btn flex items-center space-x-2 text-sm font-medium text-blue-600 dark:text-blue-400 
                                   hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                  >
                    <span>Read more</span>
                    <span className="transform group-hover/btn:translate-x-1 transition-transform duration-200">
                      →
                    </span>
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
