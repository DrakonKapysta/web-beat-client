import type { RegisterData, RegisterResponse } from "@/types/auth";
import authHelper from "@/api/auth/AuthHelper";

export const registerAPI = async (
  registerData: RegisterData
): Promise<RegisterResponse> => {
  const { data } = await authHelper.axios.post<RegisterResponse>(
    "/auth/register",
    registerData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return data;
};
