import { getToken } from "@/utils/auth";

export const prepareHeaders = async (headers: any) => {
  const token = getToken();

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return headers;
};
