"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  // If we are on the landing page ("/" or page.tsx), don't render Sidebar or Header
  if (isLandingPage) {
    return <>{children}</>;
  }

  // On app routes (/for-you, /library, /book/[id]), render Sidebar and Header
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