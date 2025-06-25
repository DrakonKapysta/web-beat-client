import type { AuthState, LoginData, RegisterData } from "@/types/auth";
import { createContext } from "react";

interface AuthContextType extends AuthState {
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}
export const AuthContext = createContext<AuthContextType | null>(null);
