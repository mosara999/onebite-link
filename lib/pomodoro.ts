export const TIMER_DURATION_STORAGE_KEY = "pomodoro-duration-minutes";
export const DEFAULT_DURATION_MINUTES = 25;
export const MIN_DURATION_MINUTES = 1;
export const MAX_DURATION_MINUTES = 60;

export function readStoredDurationMinutes(): number {
  const stored = window.localStorage.getItem(TIMER_DURATION_STORAGE_KEY);
  const parsed = stored ? Number(stored) : NaN;

  if (
    Number.isFinite(parsed) &&
    parsed >= MIN_DURATION_MINUTES &&
    parsed <= MAX_DURATION_MINUTES
  ) {
    return parsed;
  }

  return DEFAULT_DURATION_MINUTES;
}
