"use client";

import { usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/sidebar";
import TopBar from "@/components/dashboard/topbar";

export default function DashboardLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isCreator = pathname?.startsWith("/dashboard/creator");

  if (isCreator) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-[#131313] overflow-hidden text-[#e5e2e1] font-geist">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto p-6 bg-[#131313]">
          {children}
        </main>
      </div>
    </div>
  );
}
