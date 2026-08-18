import type { Metadata } from "next";
import { cookies } from "next/headers";
import LinkGrid from "@/components/link-grid";
import { createClient } from "@/utils/supabase/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ folderId: string }>;
}): Promise<Metadata> {
  const { folderId } = await params;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: folder } = await supabase
    .from("folders")
    .select("name")
    .eq("id", folderId)
    .single();

  const folderName = folder?.name ?? "폴더";

  return {
    title: folderName,
    description: `'${folderName}' 폴더에 저장된 링크를 확인하세요.`,
  };
}

export default async function FolderLinksPage({
  params,
}: {
  params: Promise<{ folderId: string }>;
}) {
  const { folderId } = await params;

  return <LinkGrid folderId={folderId} />;
}
