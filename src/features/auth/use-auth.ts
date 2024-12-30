export default function useAuth() {
  const getUser = () => {
    return localStorage.getItem("user");
  };

  const login = () => {
    localStorage.setItem("user", "logged-in");
  };

  const logout = () => {
    localStorage.removeItem("user");
  };

  const isAuthenticated = () => {
    return !!getUser();
  };

  return { getUser, login, logout, isAuthenticated };
}

export type Auth = ReturnType<typeof useAuth>;
