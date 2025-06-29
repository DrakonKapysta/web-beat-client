import { LoginForm } from "@/components/forms/LoginForm";
import { MusicLoader } from "@/components/MusicLoader";
import { useAuth } from "@/hooks/useAuth";
import type { LoginData } from "@/types/auth";
import { Link, redirect } from "@tanstack/react-router";
import { Check } from "lucide-react";
import React, { useEffect } from "react";
import { BackLink } from "./-components/BackLink";
import { useRedirectTimer } from "@/hooks/useRedirectTimer";

export const Route = createFileRoute({
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        throw redirect({ to: "/music/editor" });
      }
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { isLoading, isAuthenticated, login, error } = useAuth();
  const { time, start } = useRedirectTimer({
    redirectPath: "/",
    startTime: 5,
  });

  useEffect(() => {
    if (isAuthenticated) start();
  }, [isAuthenticated, start]);

  const handleSubmit = (data: LoginData) => {
    login(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {isLoading ? (
        <MusicLoader />
      ) : (
        <>
          {/* Background decorative elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-pink-500 opacity-20 blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-500 opacity-10 blur-3xl"></div>
          </div>

          {/* Back Arrow */}
          <BackLink to="/" />

          {/* Floating music notes */}
          <div className="absolute top-20 left-20 text-purple-300 opacity-30 animate-bounce">
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
          <div
            className="absolute top-32 right-32 text-pink-300 opacity-30 animate-bounce"
            style={{ animationDelay: "1s" }}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>
          <div
            className="absolute bottom-32 left-32 text-indigo-300 opacity-30 animate-bounce"
            style={{ animationDelay: "0.5s" }}
          >
            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
          </div>

          {/* Main content */}
          <div className="relative z-10 w-full max-w-md px-6">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="p-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                  </svg>
                </div>
              </div>
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome Back
              </h1>
              <p className="text-purple-200 text-lg">
                Sign in to continue your musical journey
              </p>
            </div>

            {/* Login Form Card */}
            <div className="flex flex-col items-center justify-center min-h-64 bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
              {!isAuthenticated ? (
                <div className="w-full">
                  <LoginForm onSubmit={handleSubmit} />
                  {/* Divider */}
                  {error && (
                    <p className="text-red-500 block w-full mt-6 text-center">
                      {error}
                    </p>
                  )}
                  <div className="my-6 flex items-center w-full">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
                    <span className="px-4 text-purple-200 text-sm">or</span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
                  </div>

                  {/* Register prompt */}
                  <div className="text-center">
                    <p className="text-purple-200 mb-4">
                      Don't have an account yet?
                    </p>
                    <Link
                      to="/auth/register"
                      className="inline-flex items-center px-6 py-3 border border-purple-400 bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 hover:text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
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
                          d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                        />
                      </svg>
                      Create New Account
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex flex-col items-center justify-center max-w-28 w-full min-h-28 rounded-full bg-green-500">
                    <Check
                      strokeDasharray={100}
                      color="white"
                      className="w-1/2 h-1/2 animate-dashOffset "
                    />
                  </div>
                  {isAuthenticated && (
                    <p className="block mt-4 text-white text-xl">
                      Time for redirect: <span>{time}</span>
                    </p>
                  )}
                </>
              )}
            </div>

            {/* Footer */}
            <div className="text-center mt-8">
              <p className="text-purple-300 text-sm">
                Your music, your beat, your way.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
