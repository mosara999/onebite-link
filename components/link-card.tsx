"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { getFolderName } from "@/lib/mock-data";
import { useLinks } from "@/lib/link-context";
import type { LinkItem } from "@/lib/types";
import { TrashIcon } from "@/components/icons";

function getHostname(url: string) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

export default function LinkCard({ link }: { link: LinkItem }) {
  const { deleteLink } = useLinks();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const hostname = getHostname(link.url);

  return (
    <div className="link-card-item relative">
      <a
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
        className="card-hover flex h-full flex-col gap-3 overflow-hidden rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-4"
      >
        {link.thumbnail && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={link.thumbnail}
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
        <span className="mt-auto inline-block w-fit rounded-full bg-[var(--hover-bg)] px-2 py-0.5 text-xs text-[var(--text-sub)]">
          {getFolderName(link.folderId)}
        </span>
      </a>

      <button
        type="button"
        onClick={() => setConfirmOpen(true)}
        aria-label="링크 삭제"
        className="link-delete-btn absolute top-2 right-2 rounded-md border border-[var(--border)] bg-[var(--card-bg)] p-1.5 text-[var(--text-sub)] opacity-0"
      >
        <TrashIcon />
      </button>

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
                  onClick={() => {
                    deleteLink(link.id);
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
