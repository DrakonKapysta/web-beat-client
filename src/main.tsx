import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AuthContextType } from "./providers/auth/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { AuthProvider } from "./providers/auth/AuthProvider";

export interface RouterContext {
  getTitle?: (args?: {
    params?: Record<string, unknown>;
    search?: unknown;
  }) => string;
  auth: AuthContextType | undefined;
}

const queryClient = new QueryClient();

const router = createRouter({
  routeTree,
  context: { queryClient, auth: undefined },
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
    routerContext: RouterContext;
    queryClient: QueryClient;
    auth: AuthContextType;
  }
}

function InnerApp() {
  const auth = useAuth();
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} context={{ auth }} />
    </QueryClientProvider>
  );
}

function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
