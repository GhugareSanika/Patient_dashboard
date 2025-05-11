import { Sidebar } from "@/components/dashboard/sidebar/Sidebar";
import { UserNav } from "@/components/dashboard/sidebar/UserNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Sidebar handles responsiveness internally */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-14 px-4 flex items-center justify-end border-b bg-background">
          <UserNav />
        </div>
        <main className="flex-1 overflow-y-auto p-4 bg-background">
          {children}
        </main>
      </div>
    </div>
  );
}
