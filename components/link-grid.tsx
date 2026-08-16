import { links } from "@/lib/mock-data";
import LinkCard from "@/components/link-card";

export default function LinkGrid({ folderId }: { folderId?: string }) {
  const visibleLinks = folderId
    ? links.filter((link) => link.folderId === folderId)
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
