"use client";
import React from "react";
// 1. Swap AiOutlineBookmark to BsBookmark
import { AiOutlineHome, AiOutlineSearch } from "react-icons/ai";
import { BsPencilSquare, BsBookmark } from "react-icons/bs"; 
import { LuLogOut } from "react-icons/lu";
import { auth, signOut } from "@/lib/firebase";

export default function Sidebar() {
  return (
    <aside style={{
      width: "280px",
      height: "100vh",
      position: "fixed",
      top: 0,
      left: 0,
      backgroundColor: "#f7faf9",
      borderRight: "1px solid #e5e7eb",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "24px 16px",
      zIndex: 100
    }}>
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "40px", paddingLeft: "8px" }}>
          <span style={{ fontSize: "24px" }}>📘</span>
          <span style={{ fontSize: "20px", fontWeight: "bold", color: "#0369a1" }}>Summarist</span>
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", backgroundColor: "#e0f2fe", color: "#0369a1", fontWeight: "600", cursor: "pointer" }}>
            <AiOutlineHome style={{ fontSize: "20px" }} />
            <span>For You</span>
          </div>
          {/* 2. Use the new BsBookmark vector asset here */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", color: "#4b5563", cursor: "pointer" }}>
            <BsBookmark style={{ fontSize: "18px" }} />
            <span>My Library</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", color: "#4b5563", cursor: "pointer" }}>
            <BsPencilSquare style={{ fontSize: "18px" }} />
            <span>Highlights</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", color: "#4b5563", cursor: "pointer" }}>
            <AiOutlineSearch style={{ fontSize: "20px" }} />
            <span>Search</span>
          </div>
        </nav>
      </div>

      <div 
        onClick={() => signOut(auth)}
        style={{ display: "flex", alignItems: "center", gap: "12px", padding: "12px", borderRadius: "8px", color: "#9ca3af", cursor: "pointer", transition: "color 0.2s" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#9ca3af")}
      >
        <LuLogOut style={{ fontSize: "20px" }} />
        <span>Log Out</span>
      </div>
    </aside>
  );
}