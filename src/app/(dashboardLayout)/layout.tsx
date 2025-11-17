/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import AppSidebar from "@/components/shared/app-sidebar";
import NavbarClient from "@/components/shared/NavbarClient";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useGetMeQuery } from "@/redux/api/authApi";
import { logout } from "@/redux/features/authSlice";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useDecodedToken } from "@/src/hooks/useDecodedToken";
import { removeCookie } from "@/src/utils/cookies";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
  console.log("pathName", pathName);

  const token = useAppSelector((state) => state.auth.token);
  const decodedToken = useDecodedToken(token);
  const role = decodedToken?.role || "ADMIN";
  console.log(decodedToken?.id);

  const { user } = useAppSelector((state) => state.auth);
  console.log("uesr", user);

  const { data: getMe0 } = (useGetMeQuery(null) as any) || {};
  console.log("getMe0", getMe0);

  const originUser = getMe0?.data;
  console.log("originUser", originUser);

  const currentUser = {
    userName: originUser?.fullName,
    email: originUser?.email,
    profileImage: originUser?.profile,
  };

  const handleLogout = async () => {
    await removeCookie();
    dispatch(logout());
    router.push("/");
  };
  const headerTitleMap: Record<string, React.ReactNode> = {
    "/admin/user": (
      <div>
        <h1 className="text-xl font-semibold">User Management</h1>
        <p className="text-sm text-muted-foreground mt-1">
          View and manage all user accounts
        </p>
      </div>
    ),

    "/admin/subscription_revenue": (
      <div>
        <h1 className="text-xl font-semibold">Subscriptions & Revenue</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage pricing and monitor financial performance
        </p>
      </div>
    ),

    "/dashboard": <h1 className="text-xl font-semibold">Dashboard Overview</h1>,

    "/admin/settings": (
      <div>
        <h1 className="text-xl font-semibold">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Update Profile & Security
        </p>
      </div>
    ),
  };

  const pageHeader = headerTitleMap[pathName] || "Dashboard";

  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <SidebarInset>
        <header className="pt-2 h-20 b shrink-0 bg-[#f6f6f6]  items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex justify-between items-center gap-2 px-4">
            <div className="flex justify-between items-center gap-8">
              <SidebarTrigger className="-ml-1" />
              <h1 className="text-xl font-semibold">{pageHeader}</h1>
            </div>

            <NavbarClient
              currentUser={currentUser}
              handleLogout={handleLogout}
              getDashboardUrl={() => "/admin/settings"}
            />
          </div>
        </header>
        <div className="p-4 pt-0 bg-[#f6f6f6] min-h-screen">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
