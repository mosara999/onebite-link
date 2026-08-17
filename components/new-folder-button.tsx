"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { useFolders } from "@/lib/folder-context";

export default function NewFolderButton() {
  const { addFolder, isAddingFolder } = useFolders();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  function closeModal() {
    setOpen(false);
    setName("");
    setError("");
  }

  async function handleSave() {
    if (!name.trim() || isAddingFolder) return;

    setError("");
    try {
      await addFolder(name);
      closeModal();
    } catch {
      setError("폴더를 추가하지 못했습니다. 다시 시도해주세요.");
    }
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

              {error && <p className="text-sm text-[var(--error)]">{error}</p>}

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={isAddingFolder}
                  className="btn-secondary rounded-md border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  취소
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={isAddingFolder}
                  className="btn-primary rounded-md px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {isAddingFolder ? "추가하는 중..." : "저장"}
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
