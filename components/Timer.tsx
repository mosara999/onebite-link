type TimerProps = {
  secondsLeft: number;
};

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

export default function Timer({ secondsLeft }: TimerProps) {
  return (
    <p className="font-mono text-7xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-50">
      {formatTime(secondsLeft)}
    </p>
  );
}
