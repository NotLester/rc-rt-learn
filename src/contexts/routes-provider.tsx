import { createRouter, RouterProvider } from "@tanstack/react-router";

import useAuth from "../features/auth/use-auth.ts";
import ErrorComponent from "../features/shared/components/error.tsx";
import LoadingComponent from "../features/shared/components/loading.tsx";
import NotFound from "../features/shared/components/not-found.tsx";
import { routeTree } from "../routeTree.gen.ts";
import { queryClient } from "./react-query-provider.tsx";

const router = createRouter({
  routeTree,
  defaultPreload: "intent",
  context: { queryClient: undefined!, auth: undefined! },
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  defaultPendingComponent: () => <LoadingComponent />,
  defaultNotFoundComponent: () => <NotFound />,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function RoutesProvider() {
  const auth = useAuth();
  const context = { queryClient, auth };

  return <RouterProvider router={router} context={context} />;
}
