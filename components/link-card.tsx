import { getFolderName } from "@/lib/mock-data";
import type { LinkItem } from "@/lib/types";

function getHostname(url: string) {
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return url;
  }
}

export default function LinkCard({ link }: { link: LinkItem }) {
  const hostname = getHostname(link.url);

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover flex flex-col gap-3 rounded-lg border border-[var(--border)] bg-[var(--card-bg)] p-4"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-sm font-semibold text-[var(--accent)]">
          {hostname[0]?.toUpperCase() ?? "?"}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-[var(--text)]">
            {link.title}
          </p>
          <p className="truncate text-xs text-[var(--text-sub)]">{hostname}</p>
        </div>
      </div>
      <p className="line-clamp-2 text-sm text-[var(--text-sub)]">
        {link.description}
      </p>
      <span className="mt-auto inline-block w-fit rounded-full bg-[var(--hover-bg)] px-2 py-0.5 text-xs text-[var(--text-sub)]">
        {getFolderName(link.folderId)}
      </span>
    </a>
  );
}
