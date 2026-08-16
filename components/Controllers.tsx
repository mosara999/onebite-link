import Link from "next/link";

type ControllersProps = {
  isRunning: boolean;
  onStart: () => void;
  onStop: () => void;
  onReset: () => void;
};

export default function Controllers({
  isRunning,
  onStart,
  onStop,
  onReset,
}: ControllersProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-3">
      <button
        type="button"
        onClick={onStart}
        disabled={isRunning}
        className="rounded-full bg-foreground px-6 py-2 text-background transition duration-150 hover:scale-105 hover:bg-[#383838] active:scale-95 disabled:pointer-events-none disabled:opacity-40 dark:hover:bg-[#ccc]"
      >
        시작
      </button>
      <button
        type="button"
        onClick={onStop}
        disabled={!isRunning}
        className="rounded-full border border-black/[.08] px-6 py-2 transition duration-150 hover:scale-105 hover:bg-black/[.04] active:scale-95 disabled:pointer-events-none disabled:opacity-40 dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
      >
        정지
      </button>
      <button
        type="button"
        onClick={onReset}
        className="rounded-full border border-black/[.08] px-6 py-2 transition duration-150 hover:scale-105 hover:bg-black/[.04] active:scale-95 dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
      >
        초기화
      </button>
      <Link
        href="/settings"
        className="rounded-full border border-black/[.08] px-6 py-2 transition duration-150 hover:scale-105 hover:bg-black/[.04] active:scale-95 dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
      >
        설정
      </Link>
    </div>
  );
}
