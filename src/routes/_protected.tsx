import { Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute({
  beforeLoad: ({ context }) => {
    if (!context.auth?.isAuthenticated) {
      console.log("User is not authenticated, redirecting to login");
      throw redirect({
        to: "/auth/login",
        search: { redirect: location.href },
      });
    }
  },
  component: ProtectedLayout,
});

function ProtectedLayout() {
  return <Outlet />;
}
