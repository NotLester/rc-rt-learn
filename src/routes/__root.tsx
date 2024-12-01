import { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

type Context = {
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<Context>()({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/todos" className="[&.active]:font-bold">
          Todos
        </Link>
        <Link to="/posts" className="[&.active]:font-bold">
          Posts
        </Link>
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
