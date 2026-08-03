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

  if (isLandingPage && !user) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen overflow-x-hidden">
      {/* Sidebar handles mobile drawer / collapse */}
      <Sidebar />
      
      <div className="flex flex-col flex-grow min-w-0 w-full">
        <Header />
        <main className="flex-grow p-4 md:p-8 max-w-full overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}