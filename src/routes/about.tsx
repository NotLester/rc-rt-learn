import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: () => <About />,
});

function About() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 transition-colors duration-200">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm dark:shadow-gray-900/30 p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              About Task Manager
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              A modern task management application built with React and TanStack
              Router
            </p>
          </div>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                Features
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                    Task Management
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Create, organize, and track your tasks with ease
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                    Post Updates
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Share and manage posts within your team
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                    Dark Mode
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Comfortable viewing experience in any lighting
                  </p>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <h3 className="font-medium text-gray-800 dark:text-white mb-2">
                    Responsive Design
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Works seamlessly on desktop and mobile devices
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                Technologies Used
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {["React", "TypeScript", "TanStack Router", "Tailwind CSS"].map(
                  (tech) => (
                    <div
                      key={tech}
                      className="px-4 py-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg
                             text-blue-600 dark:text-blue-400 text-sm font-medium
                             text-center"
                    >
                      {tech}
                    </div>
                  )
                )}
              </div>
            </section>

            <section className="text-center pt-4">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                Get Started
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Ready to improve your productivity?
              </p>
              <Link to="/todos">
                <button
                  className="px-6 py-2 bg-blue-500 hover:bg-blue-600 
                         dark:bg-blue-600 dark:hover:bg-blue-700
                         text-white rounded-lg font-medium
                         transition-colors duration-200"
                >
                  Try Task Manager
                </button>
              </Link>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
