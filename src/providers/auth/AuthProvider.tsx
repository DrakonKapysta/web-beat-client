import React from "react";
import { AuthContext } from "./AuthContext";
import type { LoginData, RegisterData, User } from "@/types/auth";
import { loginAPI } from "@/api/auth/login";
import { registerAPI } from "@/api/auth/register";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = React.useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const login = React.useCallback(
    async (loginData: LoginData): Promise<void> => {
      try {
        setIsLoading(true);
        const { data, status } = await loginAPI(loginData);

        if (status !== 200) {
          throw new Error("Login failed");
        }

        if (typeof window !== "undefined") {
          localStorage.setItem("access_token", data.access_token);
        }

        setIsAuthenticated(true);
        setUser(data.user);
        setIsLoading(false);
      } catch (error: unknown) {
        console.error("Login error:", error);
        setError((error as Error).message);
        setTimeout(() => setError(null), 5000);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const register = React.useCallback(
    async (registerData: RegisterData): Promise<void> => {
      try {
        setIsLoading(true);
        const { data, status } = await registerAPI(registerData);

        if (status !== 201) {
          throw new Error("Registration failed");
        }

        setIsAuthenticated(true);
        setUser(data.user);
        setIsLoading(false);
      } catch (error: unknown) {
        setError((error as Error).message);
        setTimeout(() => setError(null), 5000);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const logout = React.useCallback(async (): Promise<void> => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
    }

    setIsAuthenticated(false);
    setUser(null);
  }, []);

  const refreshToken = async (): Promise<void> => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/auth/verify", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        logout();
        return;
      }

      const { user } = await response.json();
    } catch (error) {
      console.error("Token verification failed:", error);
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        login,
        register,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
