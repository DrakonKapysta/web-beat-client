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
          console.log("Login failed with status:", status);
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

  React.useEffect(() => {
    setIsLoading(true);
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsAuthenticated(true);
      setIsLoading(false);
      return;
    }
    setIsAuthenticated(false);
    setUser(null);
    setIsLoading(false);
  }, []);

  // Debug effect to track auth state changes
  React.useEffect(() => {
    console.log("Auth state changed:", {
      isLoading,
      isAuthenticated,
      user: user ? { id: user.id, email: user.email } : null,
    });
  }, [isLoading, isAuthenticated, user]);

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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
