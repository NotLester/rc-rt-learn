export default function ErrorComponent({ error }: { error: Error }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8">
        <div className="text-center">
          {/* Error Icon */}
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30">
            <svg
              className="h-6 w-6 text-red-600 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
            Failed to Load Route
          </h3>

          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <p className="mb-4">
              We encountered an error while loading this page.
            </p>
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded p-3 text-left">
              <p className="font-mono text-sm text-red-600 dark:text-red-400">
                {error.message}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => window.location.reload()}
              className="inline-flex items-center px-4 py-2 border border-transparent 
                         text-sm font-medium rounded-md text-white 
                         bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
                         transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
