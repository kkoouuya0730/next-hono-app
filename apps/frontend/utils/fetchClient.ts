import { getIdToken } from "@/aws/auth";

export const apiFetch = async <T>(path: string, options?: RequestInit): Promise<T> => {
  const token = await getIdToken();

  if (!token) {
    throw new Error("Not authenticated");
  }
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...options,
    headers: {
      ...(options?.headers ?? {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }

  return res.json();
};
