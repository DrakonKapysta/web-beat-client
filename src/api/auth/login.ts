import type { LoginData } from "@/types/auth";
import authHelper from "@/api/auth/AuthHelper";

export const loginAPI = async (
  loginData: LoginData
): Promise<{ access_token: string }> => {
  const { data } = await authHelper.axios.post<{ access_token: string }>(
    "/auth/login",
    loginData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};
