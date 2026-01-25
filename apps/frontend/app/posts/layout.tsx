"use client";

import { useAuthContext } from "@/app/providers/AuthProvider";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.replace(`/auth/signin?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, isLoading, pathname, router]);

  if (isLoading) return <p>loading...</p>;
  if (!isAuthenticated) return null;

  return <>{children}</>;
}
