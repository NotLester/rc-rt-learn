import { createRouter, RouterProvider } from "@tanstack/react-router";

import { routeTree } from "../routeTree.gen.ts";
import { queryClient } from "./react-query-provider.tsx";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: { queryClient: queryClient },
  defaultErrorComponent: (err) => (
    <div>Failed to load route. Reason: {err.error.message}</div>
  ),
  defaultPendingComponent: () => <div>Loading route...</div>,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function RoutesProvider() {
  return <RouterProvider router={router} />;
}
