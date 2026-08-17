"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useFolders } from "@/lib/folder-context";
import type { Folder } from "@/lib/types";
import { PencilIcon, TrashIcon } from "@/components/icons";

export default function Sidebar() {
  const { folders, renameFolder, deleteFolder } = useFolders();
  const [folderToDelete, setFolderToDelete] = useState<Folder | null>(null);
  const [folderToEdit, setFolderToEdit] = useState<Folder | null>(null);
  const [editName, setEditName] = useState("");

  function confirmDelete() {
    if (!folderToDelete) return;
    deleteFolder(folderToDelete.id);
    setFolderToDelete(null);
  }

  function openEditModal(folder: Folder) {
    setFolderToEdit(folder);
    setEditName(folder.name);
  }

  async function confirmRename() {
    if (!folderToEdit || !editName.trim()) return;
    await renameFolder(folderToEdit.id, editName);
    setFolderToEdit(null);
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
                className="nav-hover block rounded-md px-3 py-2 pr-14 text-sm text-[var(--text)]"
              >
                {folder.name}
              </Link>
              <div className="absolute top-1/2 right-1 flex -translate-y-1/2 gap-0.5">
                <button
                  type="button"
                  onClick={() => openEditModal(folder)}
                  aria-label={`${folder.name} 폴더 이름 수정`}
                  className="folder-action-btn folder-edit-btn rounded p-1 text-[var(--text-sub)] opacity-0"
                >
                  <PencilIcon />
                </button>
                <button
                  type="button"
                  onClick={() => setFolderToDelete(folder)}
                  aria-label={`${folder.name} 폴더 삭제`}
                  className="folder-action-btn folder-delete-btn rounded p-1 text-[var(--text-sub)] opacity-0"
                >
                  <TrashIcon />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {folderToEdit &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="flex w-full max-w-sm flex-col gap-5 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-6">
              <h2 className="text-lg font-semibold text-[var(--text)]">
                폴더 이름 수정
              </h2>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="edit-folder-name"
                  className="text-sm font-medium text-[var(--text)]"
                >
                  폴더 이름
                </label>
                <input
                  id="edit-folder-name"
                  type="text"
                  autoFocus
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="폴더 이름을 입력하세요"
                  className="rounded-md border border-[var(--border)] px-3 py-2 text-base text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setFolderToEdit(null)}
                  className="btn-secondary rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)]"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={confirmRename}
                  className="btn-primary rounded-md px-4 py-2 text-sm font-medium text-white"
                >
                  저장
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}

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
