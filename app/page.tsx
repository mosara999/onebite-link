"use client";

import { useEffect, useState } from "react";
import Timer from "@/components/Timer";
import Controllers from "@/components/Controllers";
import {
  DEFAULT_DURATION_MINUTES,
  readStoredDurationMinutes,
} from "@/lib/pomodoro";

export default function Home() {
  const [durationMinutes, setDurationMinutes] = useState(
    DEFAULT_DURATION_MINUTES
  );
  const [secondsLeft, setSecondsLeft] = useState(
    DEFAULT_DURATION_MINUTES * 60
  );
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    const minutes = readStoredDurationMinutes();
    setDurationMinutes(minutes);
    setSecondsLeft(minutes * 60);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const intervalId = window.setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, [isRunning]);

  function handleStart() {
    if (secondsLeft === 0) return;
    setIsRunning(true);
  }

  function handleStop() {
    setIsRunning(false);
  }

  function handleReset() {
    setIsRunning(false);
    setSecondsLeft(durationMinutes * 60);
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-10 bg-zinc-50 px-6 dark:bg-black">
      <h1 className="text-4xl font-bold text-zinc-900 dark:text-zinc-50">
        pomodoro
      </h1>
      <Timer secondsLeft={secondsLeft} />
      <Controllers
        isRunning={isRunning}
        onStart={handleStart}
        onStop={handleStop}
        onReset={handleReset}
      />
    </div>
  );
}
