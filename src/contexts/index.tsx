import DarkModeProvider from "./dark-mode-provider.tsx";
import ReactQueryProvider from "./react-query-provider.tsx";
import RoutesProvider from "./routes-provider.tsx";

export default function Providers() {
  return (
    <ReactQueryProvider>
      <DarkModeProvider>
        <RoutesProvider />
      </DarkModeProvider>
    </ReactQueryProvider>
  );
}
