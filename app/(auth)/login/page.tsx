import type { Metadata } from "next";
import LoginForm from "@/components/login-form";

export const metadata: Metadata = {
  title: "로그인",
  description: "이메일 또는 카카오 계정으로 로그인하세요.",
};

export default function LoginPage() {
  return <LoginForm />;
}
