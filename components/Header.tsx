"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full h-16 border-b border-gray-200 px-4 flex items-center justify-between sticky top-0 bg-white z-40">
      {/* Brand logo for Mobile */}
      <div className="flex items-center gap-2 md:hidden">
        <Link href="/for-you" className="font-bold text-lg text-[#03314b]">
          Summarist
        </Link>
      </div>

      {/* Mobile Navigation Links (Hidden on desktop `md:hidden`) */}
      <nav className="flex items-center gap-4 md:hidden">
        <Link 
          href="/for-you" 
          className={`text-sm font-medium ${pathname === "/for-you" ? "text-sky-600 font-bold" : "text-gray-600"}`}
        >
          For You
        </Link>
        <Link 
          href="/library" 
          className={`text-sm font-medium ${pathname === "/library" ? "text-sky-600 font-bold" : "text-gray-600"}`}
        >
          Library
        </Link>
        <Link 
          href="/settings" 
          className={`text-sm font-medium ${pathname === "/settings" ? "text-sky-600 font-bold" : "text-gray-600"}`}
        >
          Settings
        </Link>
      </nav>

      {/* Existing Header Search/Profile components here... */}
    </header>
  );
}