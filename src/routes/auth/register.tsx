import RegisterForm from "@/components/forms/RegisterForm";
import { Link, redirect } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute({
  beforeLoad: () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");
      if (token) {
        throw redirect({ to: "/music/visualizer" });
      }
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-purple-500 opacity-20 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-pink-500 opacity-20 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-indigo-500 opacity-10 blur-3xl"></div>
        <div className="absolute top-20 right-20 w-60 h-60 rounded-full bg-cyan-500 opacity-15 blur-3xl"></div>
      </div>

      {/* Floating music notes */}
      <div className="absolute top-16 left-16 text-purple-300 opacity-30 animate-bounce">
        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      </div>
      <div
        className="absolute top-40 right-28 text-pink-300 opacity-30 animate-bounce"
        style={{ animationDelay: "1.2s" }}
      >
        <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      </div>
      <div
        className="absolute bottom-28 left-28 text-indigo-300 opacity-30 animate-bounce"
        style={{ animationDelay: "0.8s" }}
      >
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      </div>
      <div
        className="absolute bottom-16 right-16 text-cyan-300 opacity-30 animate-bounce"
        style={{ animationDelay: "0.3s" }}
      >
        <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
        </svg>
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-lg px-6 py-2">
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
          <h1 className="text-4xl font-bold text-white mb-2">Join the Beat</h1>
          <p className="text-purple-200 text-lg">
            Create your account and start your musical adventure
          </p>
        </div>

        {/* Register Form Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
          <RegisterForm />

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
            <span className="px-4 text-purple-200 text-sm">or</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-purple-300 to-transparent"></div>
          </div>

          {/* Login prompt */}
          <div className="text-center">
            <p className="text-purple-200 mb-4">Already have an account?</p>
            <Link
              to="/auth/login"
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
                  d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1"
                />
              </svg>
              Sign In Instead
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-purple-300 text-sm">
            By signing up, you agree to our{" "}
            <Link to="/" className="text-purple-200 hover:text-white underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/" className="text-purple-200 hover:text-white underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
