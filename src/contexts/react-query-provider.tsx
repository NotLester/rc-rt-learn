import { PropsWithChildren } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient();

export default function ReactQueryProvider({ children }: PropsWithChildren) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} client={queryClient} />
    </QueryClientProvider>
  );
}
