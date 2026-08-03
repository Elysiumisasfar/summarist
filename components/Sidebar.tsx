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
import { BsBookmark, BsBook } from "react-icons/bs";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, openAuthModal, logout } = useAuth();

  const navItems = [
    { label: "For you", icon: <AiOutlineHome />, href: "/for-you", active: pathname === "/for-you" },
    { label: "My Library", icon: <BsBookmark />, href: "/library", active: pathname === "/library" },
    { label: "Highlights", icon: <AiOutlineHighlight />, href: "#", disabled: true },
    { label: "Search", icon: <AiOutlineSearch />, href: "#", disabled: true },
    { label: "Settings", icon: <AiOutlineSetting />, href: "/settings", active: pathname === "/settings" },
    { label: "Help & Support", icon: <AiOutlineQuestionCircle />, href: "#", disabled: true },
  ];

  return (
    <>
      <style jsx>{`
        .sidebar-desktop {
          width: 200px;
          min-width: 200px;
          height: 100vh;
          position: sticky;
          top: 0;
          background-color: #f7faf9;
          border-right: 1px solid #e5e7eb;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 24px 16px;
          box-sizing: border-box;
        }

        .mobile-hamburger {
          display: none;
        }

        @media (max-width: 768px) {
          .mobile-hamburger {
            display: block;
            position: fixed;
            top: 16px;
            left: 16px;
            z-index: 50;
            background: transparent;
            border: none;
            cursor: pointer;
          }

          .sidebar-desktop {
            position: fixed;
            left: 0;
            top: 0;
            z-index: 50;
            transform: ${isOpen ? "translateX(0)" : "translateX(-100%)"};
            transition: transform 0.3s ease-in-out;
            box-shadow: ${isOpen ? "4px 0 12px rgba(0,0,0,0.15)" : "none"};
          }
        }
      `}</style>

      {/* Mobile Hamburger Button */}
      <button 
        className="mobile-hamburger" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Navigation"
      >
        {isOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
      </button>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 45
          }}
        />
      )}

      <aside className="sidebar-desktop">
        <div>
          {/* Brand Logo */}
          <Link 
            href="/for-you" 
            onClick={() => setIsOpen(false)} 
            style={{ 
              display: "flex", 
              alignItems: "center", 
              gap: "8px", 
              textDecoration: "none", 
              color: "#03314b", 
              marginBottom: "36px",
              paddingLeft: "8px"
            }}
          >
            <BsBook style={{ fontSize: "24px" }} />
            <span style={{ fontSize: "20px", fontWeight: "700", letterSpacing: "-0.5px" }}>Summarist</span>
          </Link>

          {/* Navigation Links */}
          <nav style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {navItems.map((item, idx) => {
              if (item.disabled) {
                return (
                  <div
                    key={idx}
                    style={{
                      display: "flex", alignItems: "center", gap: "12px", padding: "8px",
                      color: "#9ca3af", cursor: "not-allowed", fontSize: "14px", fontWeight: "500"
                    }}
                  >
                    <span style={{ fontSize: "18px" }}>{item.icon}</span>
                    {item.label}
                  </div>
                );
              }

              return (
                <Link
                  key={idx}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                    padding: "8px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontSize: "14px",
                    fontWeight: item.active ? "600" : "500",
                    color: item.active ? "#03314b" : "#374151",
                    backgroundColor: item.active ? "#e1f7e5" : "transparent"
                  }}
                >
                  <span style={{ fontSize: "18px", color: "#03314b" }}>{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Auth Action at the bottom of sidebar */}
        <div style={{ paddingTop: "16px", borderTop: "1px solid #e5e7eb" }}>
          {user ? (
            <button
              onClick={() => { setIsOpen(false); logout(); }}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "8px",
                borderRadius: "6px", border: "none", backgroundColor: "transparent", cursor: "pointer",
                color: "#374151", fontSize: "14px", fontWeight: "500"
              }}
            >
              <AiOutlineLogout style={{ fontSize: "18px" }} />
              Log out
            </button>
          ) : (
            <button
              onClick={() => { setIsOpen(false); openAuthModal(); }}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: "12px", padding: "8px",
                borderRadius: "6px", border: "none", backgroundColor: "transparent", cursor: "pointer",
                color: "#374151", fontSize: "14px", fontWeight: "500"
              }}
            >
              <AiOutlineLogin style={{ fontSize: "18px" }} />
              Login
            </button>
          )}
        </div>
      </aside>
    </>
  );
}
