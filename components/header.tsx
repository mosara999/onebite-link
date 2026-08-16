import Link from "next/link";

export default function Header() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6">
      <Link href="/" className="text-xl font-bold text-gray-900">
        한입 링크
      </Link>
      <Link
        href="/new"
        className="flex items-center gap-1 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
      >
        <span className="text-base leading-none">+</span>
        새 링크
      </Link>
    </header>
  );
}
