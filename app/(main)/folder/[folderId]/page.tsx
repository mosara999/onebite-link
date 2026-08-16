import LinkGrid from "@/components/link-grid";

export default async function FolderLinksPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;

  return <LinkGrid folderId={folderId} />;
}
