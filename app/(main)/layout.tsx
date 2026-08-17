import { cookies } from "next/headers";
import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { FolderProvider } from "@/lib/folder-context";
import { LinkProvider } from "@/lib/link-context";
import { createClient } from "@/utils/supabase/server";
import type { Folder } from "@/lib/types";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: initialFolders } = await supabase
    .from("folders")
    .select("id, name, created_at")
    .order("id", { ascending: true });

  return (
    <FolderProvider initialFolders={(initialFolders ?? []) as Folder[]}>
      <LinkProvider>
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
