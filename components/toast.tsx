export default function Toast({ message }: { message: string }) {
  return (
    <div className="fixed top-6 left-1/2 z-50 -translate-x-1/2 rounded-md border border-[var(--error)] bg-[var(--card-bg)] px-4 py-3 text-sm font-medium text-[var(--error)]">
      {message}
    </div>
  );
}
