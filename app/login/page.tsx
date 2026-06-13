"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginForm from "../../components/login/LoginForm";

export default function LoginPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.replace("/dashboard");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4">
      <LoginForm />
    </div>
  );
}