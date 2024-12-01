import ReactQueryProvider from "./react-query-provider.tsx";
import RoutesProvider from "./routes-provider.tsx";

export default function Providers() {
  return (
    <ReactQueryProvider>
      <RoutesProvider />
    </ReactQueryProvider>
  );
}
