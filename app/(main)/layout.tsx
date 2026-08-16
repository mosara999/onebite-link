import Header from "@/components/header";
import Sidebar from "@/components/sidebar";
import { FolderProvider } from "@/lib/folder-context";
import { LinkProvider } from "@/lib/link-context";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FolderProvider>
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
