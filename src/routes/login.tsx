import { createFileRoute, useNavigate } from "@tanstack/react-router";

import useAuth from "../features/auth/use-auth";

export const Route = createFileRoute("/login")({
  component: () => <Login />,
});

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = () => {
    login();
    navigate({ to: "/posts" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-50 to-gray-100 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 backdrop-blur-sm rounded-2xl shadow-xl dark:shadow-gray-900/30 p-8">
        <h1 className="text-3xl font-extrabold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
          Login
        </h1>
        <button
          onClick={handleLogin}
          className="mt-4 px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 rounded-md text-black font-medium text-lg"
        >
          Login
        </button>
      </div>
    </div>
  );
}
