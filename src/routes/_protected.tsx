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
  },
  component: ProtectedLayout,
});

function ProtectedLayout() {
  return (
    <div>
      <h1>Hello from protected</h1>
      <p className="text-black">Загружаем треки...</p>
      <Outlet />
    </div>
  );
}
