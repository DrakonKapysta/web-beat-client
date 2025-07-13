import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "@tanstack/react-router";
import React from "react";

interface MusicErrorProps {
  error?: Error | string;
  onRetry?: () => void;
  title?: string;
}

export function MusicError({
  error,
  onRetry,
  title = "Something went wrong!",
}: MusicErrorProps) {
  const auth = useAuth();
  const navigate = useNavigate();
  const errorMessage = typeof error === "string" ? error : error?.message;

  React.useEffect(() => {
    const handleRedirect = async () => {
      console.error("Unauthorized access, redirecting to login...");
      await auth.logout();
      navigate({
        to: "/auth/login",
        search: { redirect: window.location.href },
      });
    };

    if ((error as any)?.status === 401) {
      handleRedirect();
    }
  }, [error, onRetry, auth, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-red-900/20 via-gray-900/20 to-black/20">
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-gray-800 to-black border-2 border-gray-600 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-red-500 to-red-700"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full border border-gray-500 opacity-30"></div>

          <div className="absolute top-0 left-1/2 w-0.5 h-full bg-red-400 transform -translate-x-1/2 rotate-45 opacity-80"></div>
          <div className="absolute top-0 left-1/2 w-0.5 h-full bg-red-400 transform -translate-x-1/2 -rotate-12 opacity-60"></div>

          <div className="absolute top-2 right-3 w-1 h-1 bg-red-400 rounded-full animate-ping"></div>
          <div
            className="absolute bottom-3 left-2 w-1 h-1 bg-orange-400 rounded-full animate-ping"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute top-4 left-4 w-0.5 h-0.5 bg-red-300 rounded-full animate-ping"
            style={{ animationDelay: "1s" }}
          ></div>
        </div>

        <div className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 rounded-full flex items-center justify-center border-2 border-white">
          <svg
            className="w-4 h-4 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      <div className="flex items-end space-x-1 mb-6">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="w-1 bg-gradient-to-t from-gray-600 to-gray-400 rounded-full opacity-50"
            style={{
              height: `${Math.random() * 15 + 8}px`,
            }}
          ></div>
        ))}
      </div>

      <div className="text-center max-w-md px-6">
        <h2 className="text-2xl font-bold text-red-400 mb-3 animate-pulse">
          {title}
        </h2>

        <p className="text-black mb-2">
          We encountered an unexpected error while trying to load the music
          editor. This could be due to a network issue, server error, or an
          unexpected response from the server.
        </p>

        <p className="text-sm text-gray-400 mb-6">{errorMessage}</p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Retry
            </button>
          )}

          <button
            onClick={() => (window.location.href = "/")}
            className="px-6 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Home
          </button>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 text-red-400 opacity-10 animate-float text-2xl">
          💥
        </div>
        <div className="absolute top-1/3 right-1/4 text-orange-400 opacity-10 animate-float-delayed text-xl">
          ⚡
        </div>
        <div className="absolute bottom-1/3 left-1/3 text-red-400 opacity-10 animate-float text-lg">
          🔥
        </div>
        <div className="absolute bottom-1/4 right-1/3 text-gray-400 opacity-10 animate-float-delayed text-xl">
          💀
        </div>
      </div>
    </div>
  );
}
