import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import DarkModeToggle from "../shared/components/toggle-dark-mode";

interface Context {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<Context>()({
  component: () => <Home />,
});

function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Navigation Header */}
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                Task Manager
              </h1>
            </div>

            {/* Navigation Links and Dark Mode Toggle */}
            <div className="flex items-center gap-8">
              <Link
                to="/todos"
                className="
                  px-3 py-2 rounded-md text-sm font-medium
                  transition-colors duration-200
                  text-gray-600 dark:text-gray-300 
                  hover:text-gray-900 dark:hover:text-white 
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  [&.active]:text-blue-600 dark:[&.active]:text-blue-400 
                  [&.active]:bg-blue-50 dark:[&.active]:bg-blue-900/30
                "
              >
                Todos
              </Link>
              <Link
                to="/posts"
                className="
                  px-3 py-2 rounded-md text-sm font-medium
                  transition-colors duration-200
                  text-gray-600 dark:text-gray-300 
                  hover:text-gray-900 dark:hover:text-white 
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  [&.active]:text-blue-600 dark:[&.active]:text-blue-400 
                  [&.active]:bg-blue-50 dark:[&.active]:bg-blue-900/30
                "
              >
                Posts
              </Link>
              <Link
                to="/about"
                className="
                  px-3 py-2 rounded-md text-sm font-medium
                  transition-colors duration-200
                  text-gray-600 dark:text-gray-300 
                  hover:text-gray-900 dark:hover:text-white 
                  hover:bg-gray-100 dark:hover:bg-gray-700
                  [&.active]:text-blue-600 dark:[&.active]:text-blue-400 
                  [&.active]:bg-blue-50 dark:[&.active]:bg-blue-900/30
                "
              >
                About
              </Link>
              <DarkModeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      {/* DevTools */}
      <div className="fixed bottom-0 right-0">
        <TanStackRouterDevtools />
      </div>
    </div>
  );
}
