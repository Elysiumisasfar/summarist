"use client";
import React from "react";
import { AiOutlineHome, AiOutlineSearch, AiOutlineSetting } from "react-icons/ai";
import { BsBookmark, BsPencilSquare, BsQuestionCircle } from "react-icons/bs"; 
import { LuLogOut } from "react-icons/lu";
import { auth, signOut } from "@/lib/firebase";

export default function Sidebar() {
  return (
    <aside style={{
      width: "280px",
      minWidth: "280px", // Prevents the sidebar from squishing
      height: "100vh",
      position: "sticky", // Switched to sticky so it takes up natural width in the flex layout
      top: 0,
      backgroundColor: "#f7faf9",
      borderRight: "1px solid #e5e7eb",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "24px 16px",
      paddingBottom: "40px" // Adds clearance above the Next.js dev badge
    }}>
      {/* Top Navigation Options */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "40px", paddingLeft: "8px" }}>
          <span style={{ fontSize: "24px" }}>📘</span>
          <span style={{ fontSize: "20px", fontWeight: "bold", color: "#0369a1" }}>Summarist</span>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", backgroundColor: "#e0f2fe", color: "#0369a1", fontWeight: "600", cursor: "pointer" }}>
            <AiOutlineHome style={{ fontSize: "20px" }} />
            <span>For you</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", color: "#4b5563", cursor: "pointer" }}>
            <BsBookmark style={{ fontSize: "18px" }} />
            <span>My Library</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", color: "#9ca3af", cursor: "not-allowed" }}>
            <BsPencilSquare style={{ fontSize: "18px" }} />
            <span>Highlights</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", color: "#9ca3af", cursor: "not-allowed" }}>
            <AiOutlineSearch style={{ fontSize: "20px" }} />
            <span>Search</span>
          </div>
        </nav>
      </div>

      {/* Bottom Configuration Links matching target template */}
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", color: "#4b5563", cursor: "pointer" }}>
          <AiOutlineSetting style={{ fontSize: "20px" }} />
          <span>Settings</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", color: "#9ca3af", cursor: "not-allowed" }}>
          <BsQuestionCircle style={{ fontSize: "18px" }} />
          <span>Help & Support</span>
        </div>
        <div 
          onClick={() => signOut(auth)}
          style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", color: "#4b5563", cursor: "pointer", transition: "color 0.2s" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#4b5563")}
        >
          <LuLogOut style={{ fontSize: "20px" }} />
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
}