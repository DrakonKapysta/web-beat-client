import type { RegisterData, User } from "@/types/auth";
import authHelper from "@/api/auth/AuthHelper";

export const registerAPI = async (registerData: RegisterData) => {
  const response = await authHelper.axios.post<{ user: User }>(
    "/auth/register",
    registerData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response;
};
