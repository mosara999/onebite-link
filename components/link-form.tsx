"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useFolders } from "@/lib/folder-context";
import { useLinks } from "@/lib/link-context";

export default function LinkForm() {
  const router = useRouter();
  const { folders } = useFolders();
  const { addLink } = useLinks();

  const [url, setUrl] = useState("");
  const [folderId, setFolderId] = useState(String(folders[0]?.id ?? ""));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!url.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch(
        `/api/og?url=${encodeURIComponent(url.trim())}`,
      );
      if (!response.ok) {
        throw new Error("failed to fetch link info");
      }
      const og = await response.json();

      addLink({
        title: og.title ?? url,
        description: og.description ?? "",
        thumbnail: og.image,
        url: og.url ?? url,
        folderId: folderId || String(folders[0]?.id ?? ""),
      });

      router.push("/");
    } catch {
      setError("링크 정보를 가져오지 못했습니다. 주소를 확인해주세요.");
      setIsSubmitting(false);
    }
  }

  return (
    <section className="flex-1 px-6 pt-10 pb-6">
      <div className="mx-auto flex max-w-lg flex-col gap-8">
        <h1 className="text-[30px] leading-tight font-bold text-[var(--text)]">
          새 링크 등록
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="url"
              className="text-sm font-medium text-[var(--text)]"
            >
              링크 주소
            </label>
            <input
              id="url"
              name="url"
              type="url"
              required
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="https://example.com"
              className="rounded-md border border-[var(--border)] px-3 py-2 text-base text-[var(--text)] outline-none placeholder:text-[var(--placeholder)] focus:border-[var(--accent)]"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="folder"
              className="text-sm font-medium text-[var(--text)]"
            >
              폴더
            </label>
            <select
              id="folder"
              name="folder"
              value={folderId}
              onChange={(event) => setFolderId(event.target.value)}
              className="rounded-md border border-[var(--border)] bg-[var(--card-bg)] px-3 py-2 text-base text-[var(--text)] outline-none focus:border-[var(--accent)]"
            >
              {folders.map((folder) => (
                <option key={folder.id} value={folder.id}>
                  {folder.name}
                </option>
              ))}
            </select>
          </div>

          {error && <p className="text-sm text-[var(--error)]">{error}</p>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary rounded-md px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {isSubmitting ? "가져오는 중..." : "확인"}
          </button>
        </form>
      </div>
    </section>
  );
}
