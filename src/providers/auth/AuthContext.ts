import type { AuthState, LoginData, RegisterData } from "@/types/auth";
import { createContext } from "react";

export interface AuthContextType extends AuthState {
  error: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextType | null>(null);
