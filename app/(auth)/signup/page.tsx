import type { Metadata } from "next";
import SignupForm from "@/components/signup-form";

export const metadata: Metadata = {
  title: "회원가입",
  description: "이메일로 새 계정을 만드세요.",
};

export default function SignupPage() {
  return <SignupForm />;
}
