/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const NavbarClient = ({ currentUser, handleLogout, getDashboardUrl }: any) => {
  const [profileOpen, setProfileOpen] = useState(false);
  console.log("");
  // First letter fallback
  const firstLetter = currentUser?.userName
    ? currentUser.userName.charAt(0).toUpperCase()
    : "?";

  return (
    <div
      onMouseEnter={() => setProfileOpen(true)}
      onMouseLeave={() => setProfileOpen(false)}
      className="relative"
    >
      {/* Avatar */}
      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-green-500 cursor-pointer">
        {currentUser?.profileImage ? (
          <Image
            src={currentUser.profileImage}
            alt={currentUser.userName || "User"}
            width={40}
            height={40}
            className="object-cover w-full h-full"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100 text-green-600 text-lg font-semibold">
            {firstLetter}
          </div>
        )}
      </div>

      {/* Dropdown */}
      <div
        className={`absolute right-0 top-12 w-60 bg-white border rounded-xl shadow-lg z-50 transform transition-all duration-200 origin-top ${
          profileOpen
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0 pointer-events-none"
        }`}
      >
        {/* User info */}
        <div className="px-4 py-3 border-b">
          <p className="text-sm font-semibold text-gray-800">
            {currentUser?.userName || "Unknown User"}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {currentUser?.email || "No email"}
          </p>
        </div>

        <ul className="divide-y">
          <li>
            <Link
              href={getDashboardUrl()}
              className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100 transition"
              onClick={() => setProfileOpen(false)}
            >
              Profile Settings
            </Link>
          </li>

          <li>
            <button
              className="w-full text-left px-4 cursor-pointer py-3 text-sm text-red-600 hover:bg-gray-100 transition"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavbarClient;
