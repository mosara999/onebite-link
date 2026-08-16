import Header from "@/components/header";
import Sidebar from "@/components/sidebar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-white">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
