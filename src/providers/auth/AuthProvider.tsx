import React from "react";
import { AuthContext } from "./AuthContext";
import type { LoginData, RegisterData, User } from "@/types/auth";
import { loginAPI } from "@/api/auth/login";
import { registerAPI } from "@/api/auth/register";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authState, setAuthState] = React.useState<{
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
  }>({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      setAuthState({ user: null, isAuthenticated: true, isLoading: false });
    }
  }, []);

  const login = async (loginData: LoginData): Promise<void> => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));
      const { data, status } = await loginAPI(loginData);

      if (status !== 200) {
        throw new Error("Login failed");
      }

      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", data.access_token);
      }

      setAuthState({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: unknown) {
      console.error("Login error:", error);
      setError((error as Error).message);
      setTimeout(() => setError(null), 5000);
    } finally {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const register = async (registerData: RegisterData): Promise<void> => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));
      const { data, status } = await registerAPI(registerData);

      if (status !== 201) {
        throw new Error("Registration failed");
      }

      setAuthState({
        user: data.user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: unknown) {
      setError((error as Error).message);
      setTimeout(() => setError(null), 5000);
    } finally {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const logout = (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("access_token");
    }

    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const refreshToken = async (): Promise<void> => {
    try {
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (!token) {
        setAuthState((prev) => ({ ...prev, isLoading: false }));
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
      setAuthState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Token verification failed:", error);
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
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
