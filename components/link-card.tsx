"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { useLinks } from "@/lib/link-context";
import { useFolders } from "@/lib/folder-context";
import type { LinkItem } from "@/lib/types";
import { PencilIcon, TrashIcon } from "@/components/icons";

function getHostname(url: string) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

export default function LinkCard({ link }: { link: LinkItem }) {
  const { updateLink, deleteLink } = useLinks();
  const { folders } = useFolders();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editTitle, setEditTitle] = useState(link.title ?? "");
  const [editDescription, setEditDescription] = useState(link.description ?? "");
  const [editFolderId, setEditFolderId] = useState(
    link.folder_id !== null ? String(link.folder_id) : "",
  );
  const hostname = getHostname(link.url);
  const folderName = folders.find((folder) => folder.id === link.folder_id)?.name;

  function openEditModal() {
    setEditTitle(link.title ?? "");
    setEditDescription(link.description ?? "");
    setEditFolderId(link.folder_id !== null ? String(link.folder_id) : "");
    setEditOpen(true);
  }

  async function confirmEdit() {
    if (!editTitle.trim()) return;
    await updateLink(link.id, {
      title: editTitle.trim(),
      description: editDescription,
      folder_id: editFolderId ? Number(editFolderId) : null,
    });
    setEditOpen(false);
  }

  return (
    <div className="link-card-item relative">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-hover flex h-full flex-col gap-3 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-4"
      >
        {link.thumbnail_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={link.thumbnail_url}
            alt=""
            className="-mx-4 -mt-4 aspect-video w-[calc(100%+2rem)] max-w-none object-cover"
          />
        )}
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-sm font-semibold text-[var(--accent)]">
            {hostname[0]?.toUpperCase() ?? "?"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[var(--text)]">
              {link.title}
            </p>
            <p className="truncate text-xs text-[var(--text-sub)]">
              {hostname}
            </p>
          </div>
        </div>
        <p className="line-clamp-2 text-sm text-[var(--text-sub)]">
          {link.description}
        </p>
        {folderName && (
          <span className="mt-auto inline-block w-fit rounded-full bg-[var(--hover-bg)] px-2 py-0.5 text-xs text-[var(--text-sub)]">
            {folderName}
          </span>
        )}
      </a>

      <div className="absolute top-2 right-2 flex gap-1">
        <button
          type="button"
          onClick={openEditModal}
          aria-label="링크 수정"
          className="link-action-btn link-edit-btn rounded-md border border-[var(--border)] bg-[var(--card-bg)] p-1.5 text-[var(--text-sub)] opacity-0"
        >
          <PencilIcon />
        </button>
        <button
          type="button"
          onClick={() => setConfirmOpen(true)}
          aria-label="링크 삭제"
          className="link-action-btn link-delete-btn rounded-md border border-[var(--border)] bg-[var(--card-bg)] p-1.5 text-[var(--text-sub)] opacity-0"
        >
          <TrashIcon />
        </button>
      </div>

      {editOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="flex w-full max-w-sm flex-col gap-5 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-6">
              <h2 className="text-lg font-semibold text-[var(--text)]">
                링크 수정
              </h2>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="edit-link-folder"
                  className="text-sm font-medium text-[var(--text)]"
                >
                  폴더
                </label>
                <select
                  id="edit-link-folder"
                  value={editFolderId}
                  onChange={(e) => setEditFolderId(e.target.value)}
                  className="rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-base text-[var(--text)] outline-none focus:border-[var(--accent)]"
                >
                  {folders.map((folder) => (
                    <option key={folder.id} value={folder.id}>
                      {folder.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="edit-link-title"
                  className="text-sm font-medium text-[var(--text)]"
                >
                  제목
                </label>
                <input
                  id="edit-link-title"
                  type="text"
                  autoFocus
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="rounded-md border border-[var(--border)] px-3 py-2 text-base text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="edit-link-description"
                  className="text-sm font-medium text-[var(--text)]"
                >
                  설명
                </label>
                <textarea
                  id="edit-link-description"
                  rows={3}
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="resize-none rounded-md border border-[var(--border)] px-3 py-2 text-base text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditOpen(false)}
                  className="btn-secondary rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)]"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={confirmEdit}
                  className="btn-primary rounded-md px-4 py-2 text-sm font-medium text-white"
                >
                  저장
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}

      {confirmOpen &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="flex w-full max-w-sm flex-col gap-5 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-6">
              <h2 className="text-lg font-semibold text-[var(--text)]">
                링크를 삭제할까요?
              </h2>
              <p className="text-sm text-[var(--text-sub)]">
                {`'${link.title}' 링크를 삭제하면 되돌릴 수 없습니다.`}
              </p>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setConfirmOpen(false)}
                  className="btn-secondary rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)]"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    await deleteLink(link.id);
                    setConfirmOpen(false);
                  }}
                  className="btn-danger rounded-md px-4 py-2 text-sm font-medium text-white"
                >
                  삭제
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
}
