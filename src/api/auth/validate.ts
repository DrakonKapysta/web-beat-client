import authHelper from "@/api/auth/AuthHelper";

export const validate = async (
  token?: string,
  options?: { signal: AbortSignal }
) => {
  const response = await authHelper.axios.get<{
    roles: string[];
    email: string;
    id: string;
  }>("/auth/validate", {
    withCredentials: true,
    signal: options?.signal,
    headers: token
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {},
  });

  console.log("Validate response:", response);

  return response;
};
