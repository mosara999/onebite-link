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
      className="flex flex-col gap-3 rounded-xl border border-gray-200 bg-white p-4 transition hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-sm font-semibold text-blue-600">
          {hostname[0]?.toUpperCase() ?? "?"}
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-gray-900">
            {link.title}
          </p>
          <p className="truncate text-xs text-gray-500">{hostname}</p>
        </div>
      </div>
      <p className="line-clamp-2 text-sm text-gray-600">{link.description}</p>
      <span className="mt-auto inline-block w-fit rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
        {getFolderName(link.folderId)}
      </span>
    </a>
  );
}
