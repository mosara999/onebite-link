"use client";

import { useLinks } from "@/lib/link-context";
import LinkCard from "@/components/link-card";

export default function LinkGrid({ folderId }: { folderId?: string }) {
  const { links } = useLinks();
  const folderIdNum = folderId ? Number(folderId) : undefined;
  const visibleLinks = folderIdNum
    ? links.filter((link) => link.folder_id === folderIdNum)
    : links;

  return (
    <section className="flex-1 px-6 pt-10 pb-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {visibleLinks.map((link) => (
          <LinkCard key={link.id} link={link} />
        ))}
      </div>
    </section>
  );
}
