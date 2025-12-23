import { getIdToken } from "@/aws/auth";

export const apiFetch = async (input: RequestInfo, init: RequestInit = {}) => {
  const token = await getIdToken();

  return fetch(input, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    },
  });
};
