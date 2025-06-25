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

  const login = async (data: LoginData): Promise<void> => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));
      const { access_token } = await loginAPI(data);

      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", access_token);
      }

      setAuthState({
        user: null,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const register = async (data: RegisterData): Promise<void> => {
    try {
      setAuthState((prev) => ({ ...prev, isLoading: true }));
      const { _id: id, email } = await registerAPI(data);

      setAuthState({
        user: {
          email,
          id,
        },
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    } finally {
      setAuthState((prev) => ({ ...prev, isLoading: false }));
    }
  };

  const logout = (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
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
