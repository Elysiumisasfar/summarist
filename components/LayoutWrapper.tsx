"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { user } = useAuth();

  const isLandingPage = pathname === "/";

  // Render unauthenticated public landing page
  if (isLandingPage && !user) {
    return <>{children}</>;
  }

  // Render main app framework (Sidebar + Header) on all dashboard routes
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