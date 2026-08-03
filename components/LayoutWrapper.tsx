"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext"; // Import your Auth hook
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth(); // Read logged-in user state from context

  const isLandingPage = pathname === "/";

  // Hide Sidebar ONLY if on the landing page AND user is NOT logged in
  if (isLandingPage && !user) {
    return <>{children}</>;
  }

  // Show Sidebar if logged in OR if on any internal app route (/for-you, /library, etc.)
  return (
    <div style={{ display: "flex", width: "100%", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, minWidth: 0 }}>
        <Header />
        <main style={{ flexGrow: 1 }}>{children}</main>
      </div>
    </div>
  );
}