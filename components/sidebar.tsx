import Link from "next/link";
import { folders } from "@/lib/mock-data";

export default function Sidebar() {
  return (
    <aside className="w-56 shrink-0 border-r border-gray-200 bg-white p-4">
      <nav className="flex flex-col gap-1">
        <Link
          href="/"
          className="rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600"
        >
          All
        </Link>

        <p className="mt-4 px-3 text-xs font-semibold text-gray-400">폴더</p>
        <ul className="flex flex-col gap-1">
          {folders.map((folder) => (
            <li key={folder.id}>
              <Link
                href={`/folder/${folder.id}`}
                className="block rounded-md px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-100"
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
