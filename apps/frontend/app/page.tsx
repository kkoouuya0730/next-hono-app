"use client";

import { useRouter } from "next/navigation";
import { useAuthContext } from "./providers/AuthProvider";
import { useEffect } from "react";
import SideMenu from "@/components/SideMenu/SideMenu";
import styles from "./page.module.css";
import Timeline from "@/components/Timeline/Timeline";
import TrendingBar from "@/components/TrendingBar/TrendingBar";

export default function Home() {
  const router = useRouter();

  const { isLoading, isAuthenticated } = useAuthContext();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.replace(`/auth/signin?redirect=/`);
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) return <p>読み込み中...</p>;

  return (
    <div className={styles.container}>
      <SideMenu />
      <div className={styles.mainContents}>
        <Timeline />
        <TrendingBar />
      </div>
    </div>
  );
}
