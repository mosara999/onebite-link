"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { useFolders } from "@/lib/folder-context";

export default function NewFolderButton() {
  const { addFolder } = useFolders();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  function closeModal() {
    setOpen(false);
    setName("");
  }

  function handleSave() {
    if (!name.trim()) return;
    addFolder(name);
    closeModal();
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="btn-secondary flex items-center gap-1 rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)]"
      >
        <span className="text-base leading-none">+</span>
        새 폴더
      </button>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="flex w-full max-w-sm flex-col gap-5 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-6">
              <h2 className="text-lg font-semibold text-[var(--text)]">
                새 폴더 만들기
              </h2>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="new-folder-name"
                  className="text-sm font-medium text-[var(--text)]"
                >
                  폴더 이름
                </label>
                <input
                  id="new-folder-name"
                  type="text"
                  autoFocus
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="폴더 이름을 입력하세요"
                  className="rounded-md border border-[var(--border)] px-3 py-2 text-base text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn-secondary rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)]"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="btn-primary rounded-md px-4 py-2 text-sm font-medium text-white"
                >
                  저장
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
