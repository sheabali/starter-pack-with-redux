"use client";

import React from "react";
import { Bell, Menu } from "lucide-react";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import { useGetMeQuery } from "@/redux/api/authApi";

interface UserHeaderProps {
  title?: string;
  onOpenMobileMenu?: () => void;
}

export default function UserHeader({
  title = "Overview",
  onOpenMobileMenu,
}: UserHeaderProps) {
  const token = useAppSelector((state) => state.auth.token);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: userData } = useGetMeQuery({ skip: !token }) as any;

  const userImage =
    userData?.image ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80";

  return (
    <header className="sticky top-0 z-20 flex h-20 shrink-0 items-center justify-between border-b border-gray-100 bg-[#fbfdfc]/90 px-6 sm:px-8 lg:px-10 backdrop-blur-md">
      <div className="flex items-center gap-3">
        {onOpenMobileMenu && (
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Open navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F172A] tracking-tight">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button
          title="Notifications"
          className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200/80 text-gray-600 hover:text-gray-900 hover:bg-gray-50 shadow-xs transition-colors cursor-pointer"
        >
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#f43f5e] ring-2 ring-white" />
        </button>

        {/* User Profile Avatar */}
        <div className="relative flex items-center">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-xs relative bg-amber-100">
            <Image
              src={userImage}
              alt={userData?.firstName || "dermaine"}
              width={40}
              height={40}
              className="w-full h-full object-cover"
              unoptimized
            />
          </div>
        </div>
      </div>
    </header>
  );
}
