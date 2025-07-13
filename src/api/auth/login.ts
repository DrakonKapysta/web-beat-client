import type { LoginData, User } from "@/types/auth";
import authHelper from "@/api/auth/AuthHelper";

export const loginAPI = async (loginData: LoginData) => {
  const response = await authHelper.axios.post<{
    user: User;
    access_token: string;
  }>("/auth/login", loginData, {
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response;
};
