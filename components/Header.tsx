"use client";
import React from "react";
import SearchBar from "@/components/SearchBar"; // or your existing search component

export default function Header() {
  return (
    <header className="w-full h-16 border-b border-gray-200 px-4 md:px-8 flex items-center justify-between bg-white sticky top-0 z-30">
      {/* Spacer for mobile hamburger button */}
      <div className="w-8 md:hidden" />

      {/* Main Search Bar */}
      <div className="flex-1 max-w-xl mx-auto">
        {/* Your existing search bar code here */}
      </div>
    </header>
  );
}