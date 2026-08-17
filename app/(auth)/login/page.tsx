import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="w-full max-w-sm rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-8">
      <p className="mb-8 text-center text-2xl font-bold text-[var(--text)]">
        한입 링크
      </p>

      <form className="flex flex-col gap-5">
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
            placeholder="you@example.com"
            className="rounded-md border border-[var(--border)] px-3 py-2 text-base text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-[var(--text)]"
          >
            비밀번호
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            placeholder="비밀번호를 입력하세요"
            className="rounded-md border border-[var(--border)] px-3 py-2 text-base text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
          />
        </div>

        <button
          type="submit"
          className="btn-primary rounded-md px-4 py-2 text-sm font-medium text-white"
        >
          로그인
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-[var(--text-sub)]">
        아직 계정이 없으신가요?{" "}
        <Link href="/signup" className="text-[var(--accent)] hover:underline">
          회원가입
        </Link>
      </p>
    </div>
  );
}
