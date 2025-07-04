import authHelper from "@/api/auth/AuthHelper";

export const validate = async () => {
  const response = await authHelper.axios.get<{
    user: { roles: string[]; email: string; id: string };
  }>("/auth/validate", {
    withCredentials: true,
  });

  return response;
};
