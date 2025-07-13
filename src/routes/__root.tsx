import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import type { AuthContextType } from "@/providers/auth/AuthContext";
import type { QueryClient } from "@tanstack/react-query";
import {
  createRootRouteWithContext,
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { LogOut } from "lucide-react";
import { memo, useMemo } from "react";

interface RouterContext {
  auth: AuthContextType | undefined;
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: () => {
    return (
      <div>
        <p>This is the notFoundComponent configured on root route</p>
        <Link to="/">Start Over</Link>
      </div>
    );
  },
});

const Header = memo(() => {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    await router.invalidate();
    await navigate({ to: "/auth/login" });
  };

  return (
    <header className="bg-gradient-to-r from-purple-900 via-blue-900 to-indigo-900 shadow-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                <svg
                  className="w-6 h-6 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                WebBeat
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative group"
            >
              <span className="relative z-10">Home</span>
              <div className="absolute inset-0 bg-white/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </Link>
            <Link
              to="/music/browse"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative group [&.active]:text-purple-400"
            >
              <span className="relative z-10">Browse</span>
              <div className="absolute inset-0 bg-white/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </Link>
            <Link
              to="/music/upload"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative group [&.active]:text-purple-400"
            >
              <span className="relative z-10">Upload</span>
              <div className="absolute inset-0 bg-white/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </Link>
            <Link
              to="/music/visualizer"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative group [&.active]:text-purple-400"
            >
              <span className="relative z-10">Visualizer</span>
              <div className="absolute inset-0 bg-white/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </Link>
            <Link
              to="/about"
              className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 relative group"
            >
              <span className="relative z-10">About</span>
              <div className="absolute inset-0 bg-white/10 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </Link>
          </nav>

          {/* Action Buttons */}
          {isAuthenticated ? (
            <div>
              <Button
                onClick={handleLogout}
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-white/10 border border-white/20 transition-all duration-200"
              >
                <LogOut />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                className="text-gray-300 hover:text-white hover:bg-white/10 border border-white/20 transition-all duration-200"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                Login
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 transition-all duration-200 transform hover:scale-105">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                  />
                </svg>
                Sign Up
              </Button>
            </div>
          )}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="text-gray-300 hover:text-white p-2 rounded-md">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Animated background line */}
      <div className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 opacity-50"></div>
    </header>
  );
});

Header.displayName = "Header";

function RootComponent() {
  const location = useLocation();

  // Мемоизируем проверку для избежания лишних вычислений
  const shouldHideHeader = useMemo(() => {
    const pagesWithoutHeader = [
      "/",
      "/landing",
      "/welcome",
      "/intro",
      "/auth/login",
      "/auth/register",
    ];
    return pagesWithoutHeader.includes(location.pathname);
  }, [location.pathname]);

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {!shouldHideHeader && <Header />}

      <div className="flex-1 overflow-auto scrollbar-hidden">
        <Outlet />
      </div>
      <TanStackRouterDevtools />
    </div>
  );
}
