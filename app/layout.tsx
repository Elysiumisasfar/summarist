import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import "./globals.css";
import "./template.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Summarist",
  description: "Turn book insights into 15-minute summaries",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex bg-white text-black antialiased">
        {/* 1. Global Flex Container: 
          This wraps the layout. The sidebar sits naturally on the left, 
          and the main workspace column fills out everything to the right.
        */}
        <div style={{ display: "flex", width: "100%", minHeight: "100vh" }}>
          
          <Sidebar />

          <div style={{ display: "flex", flexDirection: "column", flexGrow: 1, minWidth: 0 }}>
            <Header />
            
            <main style={{ flexGrow: 1 }}>
              {children}
            </main>
          </div>

        </div>
      </body>
    </html>
  );
}