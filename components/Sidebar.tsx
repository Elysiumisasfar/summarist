"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  AiOutlineHome,
  AiOutlineHighlight,
  AiOutlineSearch,
  AiOutlineSetting,
  AiOutlineQuestionCircle,
  AiOutlineLogin,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineClose
} from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, openAuthModal, logout } = useAuth();

  const navItems = [
    { label: "For You", icon: <AiOutlineHome />, href: "/for-you", active: pathname === "/for-you" },
    { label: "My Library", icon: <BsBookmark />, href: "/library", active: pathname === "/library" },
    { label: "Highlights", icon: <AiOutlineHighlight />, href: "#", disabled: true },
    { label: "Search", icon: <AiOutlineSearch />, href: "#", disabled: true },
    { label: "Settings", icon: <AiOutlineSetting />, href: "/settings", active: pathname === "/settings" },
    { label: "Help & Support", icon: <AiOutlineQuestionCircle />, href: "#", disabled: true },
  ];

  return (
    <>
      {/* Mobile Hamburger Trigger (Top-Left) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-3 left-4 z-40 p-2 text-gray-700 bg-transparent border-none cursor-pointer"
        aria-label="Open Menu"
      >
        <AiOutlineMenu size={24} />
      </button>

      {/* Dark Overlay when Drawer is Open */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="md:hidden fixed inset-0 bg-black/50 z-50 transition-opacity"
        />
      )}

      {/* Sidebar / Drawer Element */}
      <aside 
        className={`
          fixed top-0 left-0 z-50 h-full w-[260px] bg-[#f7faf9] border-r border-gray-200 
          flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out
          md:static md:translate-x-0 md:min-w-[280px] md:h-screen md:sticky
          ${isOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div>
          {/* Header row with logo and mobile close button */}
          <div className="flex items-center justify-between mb-8">
            <Link 
              href="/for-you" 
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-2 text-[#03314b] no-underline"
            >
              <span className="text-xl font-extrabold tracking-tight">Summarist</span>
            </Link>

            {/* Mobile Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="md:hidden p-1 text-gray-600 bg-transparent border-none cursor-pointer"
            >
              <AiOutlineClose size={20} />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            {navItems.map((item, idx) => {
              if (item.disabled) {
                return (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 text-gray-400 cursor-not-allowed text-sm font-medium"
                  >
                    <span className="text-xl">{item.icon}</span>
                    {item.label}
                  </div>
                );
              }

              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 p-3 rounded-lg text-sm no-underline font-medium transition-colors ${
                    item.active 
                      ? "bg-sky-100 text-sky-700 font-bold" 
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className={`text-xl ${item.active ? "text-sky-700" : "text-gray-500"}`}>
                    {item.icon}
                  </span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
          {user ? (
            <button
              onClick={() => { setIsOpen(false); logout(); }}
              className="w-full flex items-center gap-3 p-3 rounded-lg border-none bg-transparent cursor-pointer text-red-600 font-semibold text-sm"
            >
              <AiOutlineLogout className="text-xl" />
              Log Out
            </button>
          ) : (
            <button
              onClick={() => { setIsOpen(false); openAuthModal(); }}
              className="w-full flex items-center gap-3 p-3 rounded-lg border-none bg-transparent cursor-pointer text-[#03314b] font-semibold text-sm"
            >
              <AiOutlineLogin className="text-xl" />
              Log In
            </button>
          )}
        </div>
      </aside>
    </>
  );
}