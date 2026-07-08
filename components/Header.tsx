"use client";
import React from "react";
import { usePathname } from "next/navigation";
import SearchBar from "./SearchBar";

export default function Header() {
  const pathname = usePathname();

  // Guard Clause: Hidden entirely on home ('/') and sales page ('/choose-plan') as requested
  if (pathname === "/" || pathname === "/choose-plan") return null;

  return (
    <header style={{
      width: "100%",
      height: "80px",
      borderBottom: "1px solid #e5e7eb",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end", // Pushes search input neatly over to the right side
      padding: "0 40px",
      backgroundColor: "#fff",
      position: "sticky",
      top: 0,
      zIndex: 100
    }}>
      <SearchBar />
    </header>
  );
}