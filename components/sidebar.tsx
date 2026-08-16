"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useFolders } from "@/lib/folder-context";
import type { Folder } from "@/lib/types";

function TrashIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
      />
    </svg>
  );
}

export default function Sidebar() {
  const { folders, deleteFolder } = useFolders();
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null);

  function confirmDelete() {
    if (!folderToDelete) return;
    deleteFolder(folderToDelete.id);
    setFolderToDelete(null);
  }

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
            <li key={folder.id} className="folder-item relative">
              <Link
                href={`/folder/${folder.id}`}
                className="nav-hover block rounded-md px-3 py-2 pr-8 text-sm text-[var(--text)]"
              >
                {folder.name}
              </Link>
              <button
                type="button"
                onClick={() => setFolderToDelete(folder)}
                aria-label={`${folder.name} 폴더 삭제`}
                className="folder-delete-btn absolute top-1/2 right-1 -translate-y-1/2 rounded p-1 text-[var(--text-sub)] opacity-0"
              >
                <TrashIcon />
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {folderToDelete &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="flex w-full max-w-sm flex-col gap-5 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-6">
              <h2 className="text-lg font-semibold text-[var(--text)]">
                폴더를 삭제할까요?
              </h2>
              <p className="text-sm text-[var(--text-sub)]">
                {`'${folderToDelete.name}' 폴더를 삭제하면 되돌릴 수 없습니다.`}
              </p>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFolderToDelete(null)}
                  className="btn-secondary rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)]"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={confirmDelete}
                  className="btn-danger rounded-md px-4 py-2 text-sm font-medium text-white"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </aside>
  );
}
