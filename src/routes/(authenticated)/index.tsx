import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(authenticated)/")({
  beforeLoad: ({ context: { auth } }) => {
    if (!auth.isAuthenticated()) {
      throw redirect({ to: "/login" });
    }
  },
});
