import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Home } from "./pages/home";

export default function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider storageKey="trog-project-theme" defaultTheme="system">
        <Home />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
