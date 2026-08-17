import { cookies } from "next/headers";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { FolderProvider } from "@/lib/folder-context";
import { LinkProvider } from "@/lib/link-context";
import { createClient } from "@/utils/supabase/server";
import type { Folder, LinkItem } from "@/lib/types";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const [{ data: initialFolders }, { data: initialLinks }] = await Promise.all([
    supabase
      .from("folders")
      .select("id, name, created_at")
      .order("id", { ascending: true }),
    supabase
      .from("links")
      .select("id, url, title, description, thumbnail_url, folder_id, created_at")
      .order("id", { ascending: false }),
  ]);

  return (
    <FolderProvider initialFolders={(initialFolders ?? []) as Folder[]}>
      <LinkProvider initialLinks={(initialLinks ?? []) as LinkItem[]}>
        <div className="flex min-h-full flex-1 flex-col bg-[var(--background)]">
          <Header />
          <div className="flex flex-1">
            <Sidebar />
            {children}
          </div>
        </div>
      </LinkProvider>
    </FolderProvider>
  );
}
