"use client";

import React from "react";
import { AiOutlineSearch } from "react-icons/ai";

export default function Header() {
  return (
    <header
      style={{
        width: "100%",
        height: "80px",
        borderBottom: "1px solid #e5e7eb",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 32px",
        backgroundColor: "#ffffff",
        position: "sticky",
        top: 0,
        zIndex: 30
      }}
    >
      {/* Top Search Bar */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#f1f5f9",
          borderRadius: "8px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          maxWidth: "340px",
          width: "100%"
        }}
      >
        <input
          type="text"
          placeholder="Search for books"
          style={{
            border: "none",
            backgroundColor: "transparent",
            padding: "10px 14px",
            fontSize: "14px",
            outline: "none",
            width: "100%",
            color: "#334155"
          }}
        />
        <button
          aria-label="Search"
          style={{
            border: "none",
            backgroundColor: "transparent",
            borderLeft: "1px solid #cbd5e1",
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#64748b"
          }}
        >
          <AiOutlineSearch style={{ fontSize: "18px" }} />
        </button>
      </div>
    </header>
  );
}