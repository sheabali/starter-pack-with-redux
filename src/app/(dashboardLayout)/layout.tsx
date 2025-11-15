"use client";

import AppSidebar from "@/components/shared/app-sidebar";
import NavbarClient from "@/components/shared/NavbarClient";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { useAppSelector } from "@/redux/hooks";
import { useDecodedToken } from "@/src/hooks/useDecodedToken";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = useAppSelector((state) => state.auth.token);
  const decodedToken = useDecodedToken(token);
  const role = decodedToken?.role || "ADMIN";
  const currentUser = {
    userName: "John Doe",
    email: "john.doe@gmail.com",
    profileImage: "https://i.ibb.co/mVjzdhHW/Rectangle-23852.png",
  };

  const handleLogout = async () => {};

  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <SidebarInset>
        <header className="pt-2 h-16 b shrink-0 bg-[#f6f6f6]  items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex justify-between items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />

            <NavbarClient
              currentUser={currentUser}
              handleLogout={handleLogout}
              getDashboardUrl={() => "/dashboard"}
            />
          </div>
        </header>
        <div className="p-4 pt-0 bg-[#f6f6f6] min-h-screen">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
