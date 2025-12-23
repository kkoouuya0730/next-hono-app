"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuthenticatedUser } from "@/aws/auth";
import { signOut } from "aws-amplify/auth";

export default function Home() {
  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getAuthenticatedUser()
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setUser(null);
  };

  if (isLoading) {
    return <p>読み込み中...</p>;
  }

  return (
    <>
      <h1>Home</h1>

      {user ? (
        <>
          <h2>ログイン中</h2>

          <pre>{JSON.stringify(user, null, 2)}</pre>

          <button onClick={handleSignOut}>ログアウト</button>
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
