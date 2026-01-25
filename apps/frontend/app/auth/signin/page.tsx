"use client";

import { executeSignIn } from "@/aws/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SignInPage() {
  const router = useRouter();
  const params = useSearchParams();
  const redirect = params.get("redirect");

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const onSubmit = async () => {
    await executeSignIn(form);

    router.replace(redirect ?? "/posts");
  };

  return (
    <>
      <h1>Sign In</h1>

      <input placeholder="username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input type="password" placeholder="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />

      <button onClick={onSubmit}>ログイン</button>
    </>
  );
}
