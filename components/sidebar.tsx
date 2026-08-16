"use client";

import Link from "next/link";
import { useFolders } from "@/lib/folder-context";

export default function Sidebar() {
  const { folders } = useFolders();

  return (
    <aside className="w-56 shrink-0 border-r border-[var(--border)] bg-[var(--background)] p-4">
      <nav className="flex flex-col gap-1">
        <Link
          href="/"
          className="nav-active rounded-md px-3 py-2 text-sm font-medium"
        >
          All
        </Link>

        <p className="mt-4 px-3 text-xs font-semibold text-[var(--text-sub)]">
          폴더
        </p>
        <ul className="flex flex-col gap-1">
          {folders.map((folder) => (
            <li key={folder.id}>
              <Link
                href={`/folder/${folder.id}`}
                className="nav-hover block rounded-md px-3 py-2 text-sm text-[var(--text)]"
              >
                {folder.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
