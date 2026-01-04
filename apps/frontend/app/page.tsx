"use client";

import { useRouter } from "next/navigation";
import { useAuthContext } from "./providers/AuthProvider";

export default function Home() {
  const router = useRouter();

  const { user, isLoading, isAuthenticated, logout } = useAuthContext();

  if (isLoading) return <p>読み込み中...</p>;

  return (
    <>
      <h1>Home</h1>

      {isAuthenticated ? (
        <>
          <h2>ログイン中</h2>

          <pre>{JSON.stringify(user, null, 2)}</pre>

          <button onClick={logout}>ログアウト</button>
        </>
      ) : (
        <>
          <h2>未ログイン</h2>

          <button onClick={() => router.push("/auth/signin")}>ログイン</button>

          <button onClick={() => router.push("/auth/signup")}>新規登録</button>
        </>
      )}
    </>
  );
}
