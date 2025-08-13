import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";
import { AppSidebar } from "./app-sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <main className="w-full m-4">
        {/* Top bar */}
        <div className="flex items-center gap-5 border-sidebar-border bg-sidebar border shadow rounded-md p-2 px-4">
          <div className="ml-auto">
            <UserButton />
          </div>
        </div>

        <div className="h-4"></div>

        {/* Page content */}
        <div className="border-sidebar-border bg-sidebar border shadow rounded-md overflow-y-scroll h-[calc(100vh-6rem)] p-4">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
