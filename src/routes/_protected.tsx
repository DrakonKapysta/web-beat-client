import { Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute({
  beforeLoad: ({ context }) => {
    console.log("Protected beforeLoad context:", {
      auth: context.auth,
      isAuthenticated: context.auth?.isAuthenticated,
      isLoading: context.auth?.isLoading,
    });

    if (context.auth?.isLoading) {
      console.log("Auth is loading, waiting...");
      return;
    }
    if (!context.auth?.isAuthenticated) {
      console.log("User is not authenticated, redirecting to login");
      throw redirect({
        to: "/auth/login",
        search: { redirect: location.href },
      });
    }
    console.log("User is authenticated, allowing access");
  },
  component: ProtectedLayout,
});

function ProtectedLayout() {
  return <Outlet />;
}
