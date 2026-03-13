import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Home } from "./pages/home";
import { queryClient } from "./lib/query-client";

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider storageKey="trog-project-theme" defaultTheme="system">
        <Toaster />
        <Home />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
