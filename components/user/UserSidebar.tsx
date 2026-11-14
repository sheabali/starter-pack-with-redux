"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/features/authSlice";
import KetadaLogo from "@/components/shared/KetadaLogo";
import {
  LayoutGrid,
  ClipboardList,
  Stethoscope,
  CalendarCheck,
  FileSearch,
  Receipt,
  UserRoundCheck,
  AlertCircle,
  Settings,
  LogOut,
  X,
} from "lucide-react";

interface UserSidebarProps {
  onCloseClick?: () => void;
}

export interface MenuItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const userMenuItems: MenuItem[] = [
  { href: "/user", icon: LayoutGrid, label: "Overview" },
  { href: "/user/assessments", icon: ClipboardList, label: "Assessments" },
  { href: "/user/strategy-report", icon: Stethoscope, label: "Strategy Report" },
  { href: "/user/consultation", icon: CalendarCheck, label: "Book Consultation" },
  { href: "/user/pathway-matches", icon: FileSearch, label: "Pathway Matches" },
  { href: "/user/purchase-history", icon: Receipt, label: "Purchase History" },
  { href: "/user/profile", icon: UserRoundCheck, label: "Immigration Profile" },
  { href: "/user/help", icon: AlertCircle, label: "Help" },
  { href: "/user/settings", icon: Settings, label: "Setting" },
];

export default function UserSidebar({ onCloseClick }: UserSidebarProps) {
  const pathname = usePathname();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  };

  return (
    <aside className="w-64 lg:w-72 h-screen bg-white flex flex-col border-r border-[#EFEFEF] select-none shrink-0 sticky top-0">
      {/* Mobile Close Button */}
      {onCloseClick && (
        <button
          onClick={onCloseClick}
          className="absolute top-4 right-4 lg:hidden p-2 rounded-md text-gray-500 hover:text-red-500 hover:bg-gray-100 transition-colors z-20"
          aria-label="Close Sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      )}

      {/* Brand Header */}
      <div className="px-6 py-6 border-b border-gray-100/70 flex items-center">
        <Link href="/user" className="flex items-center">
          <KetadaLogo className="h-9" />
        </Link>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-4 py-4 overflow-y-auto no-scrollbar">
        <ul className="space-y-1">
          {userMenuItems.map((item) => {
            const isActive =
              item.href === "/user"
                ? pathname === "/user" || pathname === "/user/"
                : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onCloseClick}
                  className={`flex items-center gap-3.5 px-4 py-2.5 rounded-xl text-[14px] font-medium transition-all ${
                    isActive
                      ? "bg-[#00a651] text-white shadow-xs font-semibold"
                      : "text-[#5b616e] hover:bg-[#f6f9f8] hover:text-[#111111]"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors shrink-0 ${
                      isActive ? "text-white" : "text-[#717887]"
                    }`}
                  />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Action */}
      <div className="p-4 border-t border-gray-100/70">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold bg-[#e8f7ee] text-[#ea384c] hover:bg-[#d8f2e2] transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-[#ea384c] shrink-0" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
