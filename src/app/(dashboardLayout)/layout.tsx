"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import UserSidebar from "@/components/user/UserSidebar";
import UserHeader from "@/components/user/UserHeader";
import AppSidebar from "@/components/shared/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Bell, ChevronRight, Home, Search } from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import { useDecodedToken } from "@/src/hooks/useDecodedToken";

const pageTitles: Record<string, string> = {
  "/user": "Overview",
  "/user/": "Overview",
  "/user/assessments": "Assessments",
  "/user/strategy-report": "Strategy Report",
  "/user/consultation": "Book Consultation",
  "/user/pathway-matches": "Pathway Matches",
  "/user/purchase-history": "Purchase History",
  "/user/profile": "Immigration Profile",
  "/user/help": "Help",
  "/user/settings": "Setting",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const token = useAppSelector((state) => state.auth.token);
  const decodedToken = useDecodedToken(token);
  const role = decodedToken?.role || "USER";

  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // If visiting admin routes, retain admin layout
  if (pathname.startsWith("/admin")) {
    return (
      <SidebarProvider>
        <AppSidebar role={role} />
        <SidebarInset className="bg-[#f8fafc]">
          <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center justify-between gap-4 border-b border-gray-200/80 bg-white/95 px-4 sm:px-6 backdrop-blur-sm transition-all">
            <div className="flex items-center gap-3">
              <SidebarTrigger className="-ml-1 text-gray-600 hover:text-gray-900 rounded-xs" />
              <div className="h-4 w-[1px] bg-gray-200" />
              <nav className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                <Link
                  href="/admin/dashboard"
                  className="hover:text-gray-900 flex items-center gap-1"
                >
                  <Home size={13} />
                  <span>Dashboard</span>
                </Link>
                <ChevronRight size={12} className="text-gray-400" />
                <span className="text-gray-900 font-semibold">Overview</span>
              </nav>
            </div>

            <div className="flex items-center gap-2.5">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-100/80 hover:bg-gray-100 rounded-xs border border-gray-200 text-xs text-gray-500 cursor-pointer transition-colors">
                <Search size={14} className="text-gray-400" />
                <span>Search platform...</span>
                <kbd className="ml-2 font-mono text-[10px] bg-white px-1.5 py-0.5 rounded border border-gray-200 text-gray-500">
                  ⌘K
                </kbd>
              </div>

              <button
                title="Notifications"
                className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xs transition-colors cursor-pointer"
              >
                <Bell size={18} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary ring-2 ring-white" />
              </button>
            </div>
          </header>

          <main className="flex-1 p-4 sm:p-6 lg:p-8 min-h-[calc(100vh-4rem)]">
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  // Exact User Layout matching the design
  let currentTitle = "Overview";
  if (pathname.startsWith("/user/assessments")) {
    currentTitle = "Assessments";
  } else if (pathname.startsWith("/user/strategy-report")) {
    currentTitle = "Strategy Report";
  } else if (pathname.startsWith("/user/consultation")) {
    currentTitle = "Book Consultation";
  } else if (pathname.startsWith("/user/pathway-matches")) {
    currentTitle = "Pathway Matches";
  } else if (pathname.startsWith("/user/purchase-history")) {
    currentTitle = "Purchase History";
  } else if (pathname.startsWith("/user/profile")) {
    currentTitle = "Immigration Profile";
  } else if (pathname.startsWith("/user/help")) {
    currentTitle = "Help";
  } else if (pathname.startsWith("/user/settings")) {
    currentTitle = "Setting";
  }

  return (
    <div className="flex min-h-screen bg-[#fbfdfc] antialiased">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block shrink-0">
        <UserSidebar />
      </div>

      {/* Mobile Sidebar Overlay & Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-xl">
            <UserSidebar onCloseClick={() => setMobileSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <UserHeader
          title={currentTitle}
          onOpenMobileMenu={() => setMobileSidebarOpen(true)}
        />
        <main className="flex-1 p-5 sm:p-8 lg:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
