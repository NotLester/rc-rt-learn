import { ArrowLeft, Home } from "lucide-react";

import { Link, useNavigate } from "@tanstack/react-router";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Display */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-gray-200 dark:text-gray-800">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg dark:shadow-gray-900/30 -mt-8">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-3">
                Page Not Found
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Sorry, we couldn't find the page you're looking for. Perhaps
                you've mistyped the URL? Be sure to check your spelling.
              </p>

              <div className="space-y-3">
                <Link
                  to="/about"
                  className="flex items-center justify-center gap-2 w-full px-4 py-2 
                         bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700
                         text-white rounded-lg font-medium transition-colors duration-200"
                >
                  <Home size={18} />
                  Go to Homepage
                </Link>

                <button
                  onClick={() => navigate({ to: "/about" })}
                  className="flex items-center justify-center gap-2 w-full px-4 py-2
                         bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600
                         text-gray-700 dark:text-gray-200 rounded-lg font-medium 
                         transition-colors duration-200"
                >
                  <ArrowLeft size={18} />
                  Go Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
