"use client";

import { executeSignUp } from "@/aws/auth";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onSubmit = async () => {
    await executeSignUp(form);
    router.push(`/auth/confirm?username=${form.username}`);
  };

  return (
    <>
      <h1>Sign Up</h1>

      <input placeholder="username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input placeholder="email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />

      <button onClick={onSubmit}>登録</button>
    </>
  );
}
