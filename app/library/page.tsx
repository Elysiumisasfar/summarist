"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Book } from "@/types/book";

export default function LibraryPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<"saved" | "finished">("saved");
    const [savedBooks, setSavedBooks] = useState<Book[]>([]);
    const [finishedBooks, setFinishedBooks] = useState<Book[]>([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("saved_books") || "[]");
        const finished = JSON.parse(localStorage.getItem("finished_books") || "[]");
        setSavedBooks(saved);
        setFinishedBooks(finished);
    }, []);

    const displayedBooks = activeTab === "saved" ? savedBooks : finishedBooks;

    return (
        <div style={{ maxWidth: "1070px", margin: "0 auto", padding: "40px 24px", fontFamily: "sans-serif" }}>
            <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "24px", color: "#03314b" }}>
                My Library
            </h1>

            {/* TAB NAVIGATION */}
            <div style={{ display: "flex", gap: "24px", borderBottom: "1px solid #e5e7eb", marginBottom: "32px" }}>
                <button
                    onClick={() => setActiveTab("saved")}
                    style={{
                        padding: "12px 0",
                        background: "none",
                        border: "none",
                        borderBottom: activeTab === "saved" ? "3px solid #2bd97c" : "3px solid transparent",
                        fontWeight: activeTab === "saved" ? "700" : "500",
                        color: activeTab === "saved" ? "#03314b" : "#6b7280",
                        fontSize: "16px",
                        cursor: "pointer"
                    }}
                >
                    Saved Books ({savedBooks.length})
                </button>

                <button
                    onClick={() => setActiveTab("finished")}
                    style={{
                        padding: "12px 0",
                        background: "none",
                        border: "none",
                        borderBottom: activeTab === "finished" ? "3px solid #2bd97c" : "3px solid transparent",
                        fontWeight: activeTab === "finished" ? "700" : "500",
                        color: activeTab === "finished" ? "#03314b" : "#6b7280",
                        fontSize: "16px",
                        cursor: "pointer"
                    }}
                >
                    Finished Books ({finishedBooks.length})
                </button>
            </div>

            {/* BOOK GRID */}
            {displayedBooks.length === 0 ? (
                <p style={{ color: "#6b7280", fontSize: "15px" }}>
                    {activeTab === "saved"
                        ? "You don't have any saved books yet."
                        : "You haven't finished listening to any books yet."}
                </p>
            ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: "24px" }}>
                    {displayedBooks.map((book) => (
                        <div
                            key={book.id}
                            onClick={() => router.push(`/book/${book.id}`)}
                            style={{ cursor: "pointer" }}
                        >
                            <img
                                src={book.imageLink}
                                alt={book.title}
                                style={{ width: "100%", height: "260px", borderRadius: "8px", objectFit: "cover", marginBottom: "8px" }}
                            />
                            <h4 style={{ margin: "0 0 4px 0", fontSize: "15px", fontWeight: "700", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                                {book.title}
                            </h4>
                            <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>{book.author}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}