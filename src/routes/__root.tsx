import { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

interface Context {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<Context>()({
  component: () => <Home />,
});

function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-800">Task Manager</h1>
            </div>

            {/* Navigation Links */}
            <div className="flex gap-8">
              <Link
                to="/todos"
                className="
                  px-3 py-2 rounded-md text-sm font-medium
                  transition-colors duration-200
                  text-gray-600 hover:text-gray-900 hover:bg-gray-100
                  [&.active]:text-blue-600 [&.active]:bg-blue-50
                "
              >
                Todos
              </Link>
              <Link
                to="/posts"
                className="
                  px-3 py-2 rounded-md text-sm font-medium
                  transition-colors duration-200
                  text-gray-600 hover:text-gray-900 hover:bg-gray-100
                  [&.active]:text-blue-600 [&.active]:bg-blue-50
                "
              >
                Posts
              </Link>
              <Link
                to="/about"
                className="
                  px-3 py-2 rounded-md text-sm font-medium
                  transition-colors duration-200
                  text-gray-600 hover:text-gray-900 hover:bg-gray-100
                  [&.active]:text-blue-600 [&.active]:bg-blue-50
                "
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        <Outlet />
      </main>

      <TanStackRouterDevtools />
    </div>
  );
}
