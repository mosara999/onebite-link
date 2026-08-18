"use client";

import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import Toast from "@/components/toast";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSent, setIsSent] = useState(false);

  const isFormFilled = email.trim() !== "";

  useEffect(() => {
    if (!errorMessage) return;
    const timer = setTimeout(() => setErrorMessage(""), 4000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isFormFilled || isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage("");

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(
      email.trim(),
      { redirectTo: `${window.location.origin}/reset-password` },
    );

    if (error) {
      setErrorMessage("재설정 링크 발송에 실패했습니다. 다시 시도해주세요.");
      setIsSubmitting(false);
      return;
    }

    setIsSent(true);
    setIsSubmitting(false);
  }

  return (
    <>
      {errorMessage && <Toast message={errorMessage} />}

      <div className="w-full max-w-sm rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-8">
        <p className="mb-8 text-center text-2xl font-bold text-[var(--text)]">
          한입 링크
        </p>

        {isSent ? (
          <p className="text-center text-sm text-[var(--text-sub)]">
            입력하신 이메일로 비밀번호 재설정 링크를 보냈습니다.
            <br />
            메일함을 확인해주세요.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-[var(--text)]"
              >
                이메일
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="rounded-md border border-[var(--border)] px-3 py-2 text-base text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
              />
            </div>

            <button
              type="submit"
              disabled={!isFormFilled || isSubmitting}
              className="btn-primary rounded-md px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isSubmitting ? "발송 중..." : "재설정 링크 발송"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-[var(--text-sub)]">
          <Link href="/login" className="text-[var(--accent)] hover:underline">
            로그인으로 돌아가기
          </Link>
        </p>
      </div>
    </>
  );
}
