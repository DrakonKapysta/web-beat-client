import { Button } from "@/components/ui/button";
import {
  createRootRoute,
  Link,
  Outlet,
  useLocation,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const location = useLocation();

  // Массив страниц без хедера
  const pagesWithoutHeader = ["/", "/landing", "/welcome", "/intro"];
  const shouldHideHeader = pagesWithoutHeader.includes(location.pathname);

  return (
    <>
      <div className="h-screen flex flex-col overflow-hidden">
        {!shouldHideHeader && (
          <>
            <div className="p-2 flex justify-between items-center">
              <div className="flex gap-4">
                <Link to="/" className="[&.active]:font-bold">
                  Home
                </Link>
                <Link to="/music/upload" className="[&.active]:font-bold">
                  Upload
                </Link>
                <Link to="/about" className="[&.active]:font-bold">
                  About
                </Link>
              </div>

              <div className="flex gap-2">
                <Button>Login</Button>
                <Button>Logout</Button>
              </div>
            </div>
            <hr />
          </>
        )}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>

        <TanStackRouterDevtools />
      </div>
    </>
  );
}
