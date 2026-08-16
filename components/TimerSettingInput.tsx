"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  MAX_DURATION_MINUTES,
  MIN_DURATION_MINUTES,
  readStoredDurationMinutes,
  TIMER_DURATION_STORAGE_KEY,
} from "@/lib/pomodoro";

export default function TimerSettingInput() {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setValue(String(readStoredDurationMinutes()));
  }, []);

  const isValid = (() => {
    if (value.trim() === "") return false;
    const parsed = Number(value);
    return (
      Number.isFinite(parsed) &&
      parsed >= MIN_DURATION_MINUTES &&
      parsed <= MAX_DURATION_MINUTES
    );
  })();

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    if (!isValid) {
      setError(
        `${MIN_DURATION_MINUTES}분 이상 ${MAX_DURATION_MINUTES}분 이하로 입력해주세요.`
      );
      return;
    }

    window.localStorage.setItem(TIMER_DURATION_STORAGE_KEY, value);
    router.push("/");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-3"
    >
      <label
        htmlFor="duration-minutes"
        className="text-sm text-zinc-600 dark:text-zinc-400"
      >
        타이머 시간 (분)
      </label>
      <input
        id="duration-minutes"
        type="number"
        min={MIN_DURATION_MINUTES}
        max={MAX_DURATION_MINUTES}
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
          setError("");
        }}
        className="w-40 rounded-lg border border-black/[.08] bg-white px-4 py-2 text-center text-lg dark:border-white/[.145] dark:bg-black"
        placeholder={`${MIN_DURATION_MINUTES}~${MAX_DURATION_MINUTES}`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        disabled={!isValid}
        className="rounded-full bg-foreground px-6 py-2 text-background transition-colors hover:bg-[#383838] disabled:opacity-40 dark:hover:bg-[#ccc]"
      >
        설정 완료
      </button>
    </form>
  );
}
