"use client";

import { usePathname, useRouter } from "next/navigation";
import { useAuthContext } from "../providers/AuthProvider";

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading } = useAuthContext();

  if (isLoading) return <p>認証確認中...</p>;
  if (!isAuthenticated) {
    const redirect = encodeURIComponent(pathname);
    router.replace(`/auth/signin?redirect=${redirect}`);
    return null;
  }

  return <>{children}</>;
}
