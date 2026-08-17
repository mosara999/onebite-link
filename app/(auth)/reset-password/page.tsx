"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import Toast from "@/components/toast";

type LinkStatus = "pending" | "ready" | "invalid";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [linkStatus, setLinkStatus] = useState<LinkStatus>("pending");

  const isFormFilled = password !== "" && passwordConfirm !== "";

  useEffect(() => {
    if (!errorMessage) return;
    const timer = setTimeout(() => setErrorMessage(""), 4000);
    return () => clearTimeout(timer);
  }, [errorMessage]);

  useEffect(() => {
    const supabase = createClient();
    let settled = false;

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        settled = true;
        setLinkStatus("ready");
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session && !settled) {
        settled = true;
        setLinkStatus("ready");
      }
    });

    const timer = setTimeout(() => {
      if (!settled) setLinkStatus("invalid");
    }, 4000);

    return () => {
      subscription.unsubscribe();
      clearTimeout(timer);
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isFormFilled || isSubmitting) return;

    if (password !== passwordConfirm) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    const supabase = createClient();
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setErrorMessage("비밀번호 재설정에 실패했습니다. 다시 시도해주세요.");
      setIsSubmitting(false);
      return;
    }

    router.push("/");
  }

  return (
    <>
      {errorMessage && <Toast message={errorMessage} />}

      <div className="w-full max-w-sm rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-8">
        <p className="mb-8 text-center text-2xl font-bold text-[var(--text)]">
          한입 링크
        </p>

        {linkStatus === "pending" && (
          <p className="text-center text-sm text-[var(--text-sub)]">
            재설정 링크를 확인하는 중입니다...
          </p>
        )}

        {linkStatus === "invalid" && (
          <div className="flex flex-col items-center gap-3 text-center">
            <p className="text-sm text-[var(--text-sub)]">
              비밀번호 재설정 링크가 유효하지 않거나 만료되었습니다.
            </p>
            <Link
              href="/forgot-password"
              className="text-sm text-[var(--accent)] hover:underline"
            >
              재설정 링크 다시 받기
            </Link>
          </div>
        )}

        {linkStatus === "ready" && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-[var(--text)]"
              >
                새 비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="새 비밀번호를 입력하세요"
                className="rounded-md border border-[var(--border)] px-3 py-2 text-base text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="passwordConfirm"
                className="text-sm font-medium text-[var(--text)]"
              >
                새 비밀번호 확인
              </label>
              <input
                id="passwordConfirm"
                name="passwordConfirm"
                type="password"
                required
                value={passwordConfirm}
                onChange={(event) => setPasswordConfirm(event.target.value)}
                placeholder="새 비밀번호를 다시 입력하세요"
                className="rounded-md border border-[var(--border)] px-3 py-2 text-base text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
              />
            </div>

            <button
              type="submit"
              disabled={!isFormFilled || isSubmitting}
              className="btn-primary rounded-md px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isSubmitting ? "변경 중..." : "비밀번호 변경"}
            </button>
          </form>
        )}
      </div>
    </>
  );
}
