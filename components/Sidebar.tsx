"use client";
import React from "react";
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
  AiOutlineLogout
} from "react-icons/ai";
import { BsBookmark } from "react-icons/bs"; // <--- Correct Bookmark Import

export default function Sidebar() {
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
    <aside style={{
      width: "280px",
      minWidth: "280px",
      height: "100vh",
      position: "sticky",
      top: 0,
      backgroundColor: "#f7faf9",
      borderRight: "1px solid #e5e7eb",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "24px 16px",
      boxSizing: "border-box"
    }}>
      <div>
        <Link href="/for-you" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", color: "#03314b", marginBottom: "32px", paddingLeft: "12px" }}>
          <span style={{ fontSize: "22px", fontWeight: "800", letterSpacing: "-0.5px" }}>Summarist</span>
        </Link>

        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {navItems.map((item, idx) => {
            if (item.disabled) {
              return (
                <div
                  key={idx}
                  style={{
                    display: "flex", alignItems: "center", gap: "12px", padding: "12px",
                    color: "#9ca3af", cursor: "not-allowed", fontSize: "15px", fontWeight: "500"
                  }}
                >
                  <span style={{ fontSize: "20px" }}>{item.icon}</span>
                  {item.label}
                </div>
              );
            }

            return (
              <Link
                key={idx}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px",
                  borderRadius: "8px",
                  textDecoration: "none",
                  fontSize: "15px",
                  fontWeight: item.active ? "700" : "500",
                  color: item.active ? "#0369a1" : "#374151",
                  backgroundColor: item.active ? "#e0f2fe" : "transparent"
                }}
              >
                <span style={{ fontSize: "20px", color: item.active ? "#0369a1" : "#6b7280" }}>{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div>
        {user ? (
          <button
            onClick={logout}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "12px",
              borderRadius: "8px", border: "none", backgroundColor: "transparent", cursor: "pointer",
              color: "#dc2626", fontSize: "15px", fontWeight: "600"
            }}
          >
            <AiOutlineLogout style={{ fontSize: "20px" }} />
            Log Out
          </button>
        ) : (
          <button
            onClick={openAuthModal}
            style={{
              width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "12px",
              borderRadius: "8px", border: "none", backgroundColor: "transparent", cursor: "pointer",
              color: "#03314b", fontSize: "15px", fontWeight: "600"
            }}
          >
            <AiOutlineLogin style={{ fontSize: "20px" }} />
            Log In
          </button>
        )}
      </div>
    </aside>
  );
}