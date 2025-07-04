import { validate } from "@/api/auth/validate";
import { Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute({
  beforeLoad: async ({ location }) => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("access_token")
        : null;
    if (!token) {
      throw redirect({
        to: "/auth/login",
        search: { redirect: location.href },
      });
    }
    try {
      const user = await validate();
      if (!user) {
        throw redirect({
          to: "/auth/login",
          search: { redirect: location.href },
        });
      }
    } catch (error: unknown) {
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
