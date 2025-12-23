"use client";

import { executeConfirmSignUp } from "@/aws/auth";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function ConfirmPage() {
  const params = useSearchParams();
  const router = useRouter();
  const username = params.get("username")!;
  const [code, setCode] = useState("");

  const onSubmit = async () => {
    await executeConfirmSignUp({
      username,
      confirmationCode: code,
    });
    router.push("/auth/signin");
  };

  return (
    <>
      <h1>Confirm Sign Up</h1>
      <p>username: {username}</p>

      <input placeholder="confirmation code" onChange={(e) => setCode(e.target.value)} />
      <button onClick={onSubmit}>確認</button>
    </>
  );
}
