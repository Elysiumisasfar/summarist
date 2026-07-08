"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineSearch, AiOutlineLoading3Quarters } from "react-icons/ai";
import { Book } from "@/types/book";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if user clicks completely outside of the search area
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // DEBOUNCE LOGIC: Listens to input changes, waits 300ms before hitting the endpoint
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setLoading(true);
    setIsOpen(true);

    const delayDebounceFn = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(query)}`
        );
        const data = await response.json();
        setResults(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Search API aggregation failure:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300); // 300ms threshold window requested in specifications

    return () => clearTimeout(delayDebounceFn);
  }, [query]);

  const handleResultClick = (bookId: string) => {
    setIsOpen(false);
    setQuery("");
    router.push(`/book/${bookId}`);
  };

  return (
    <div ref={dropdownRef} style={{ position: "relative", width: "100%", maxWidth: "440px" }}>
      {/* Input Box Wrapper */}
      <div style={{ display: "flex", alignItems: "center", position: "relative" }}>
        <input
          type="text"
          placeholder="Search for books by title or author..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "10px 16px",
            paddingRight: "40px",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            fontSize: "14px",
            outline: "none",
            backgroundColor: "#f1f3f4",
            color: "#333",
          }}
        />
        <div style={{ position: "absolute", right: "12px", color: "#6b7280", display: "flex", alignItems: "center" }}>
          {loading ? (
            <AiOutlineLoading3Quarters className="animate-spin" style={{ fontSize: "18px" }} />
          ) : (
            <AiOutlineSearch style={{ fontSize: "20px" }} />
          )}
        </div>
      </div>

      {/* FLOATING DROPDOWN LIST */}
      {isOpen && (
        <div style={{
          position: "absolute",
          top: "48px",
          left: 0,
          right: 0,
          backgroundColor: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          maxHeight: "320px",
          overflowY: "auto",
          zIndex: 999,
        }}>
          {loading && results.length === 0 ? (
            <div style={{ padding: "16px", fontSize: "14px", color: "#6b7280", textAlign: "center" }}>
              Searching catalog records...
            </div>
          ) : results.length > 0 ? (
            results.map((book) => (
              <div
                key={book.id}
                onClick={() => handleResultClick(book.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 16px",
                  borderBottom: "1px solid #f3f4f6",
                  cursor: "pointer",
                  transition: "background-color 0.2s"
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f9fafb")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <img src={book.imageLink} alt={book.title} style={{ width: "36px", height: "52px", objectFit: "cover", borderRadius: "4px" }} />
                <div style={{ minWidth: 0 }}>
                  <h4 style={{ fontSize: "14px", fontWeight: "600", margin: "0 0 2px 0", color: "#111827", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {book.title}
                  </h4>
                  <p style={{ fontSize: "12px", color: "#6b7280", margin: 0 }}>{book.author}</p>
                </div>
              </div>
            ))
          ) : (
            <div style={{ padding: "16px", fontSize: "14px", color: "#6b7280", textAlign: "center" }}>
              No books found matching your keywords.
            </div>
          )}
        </div>
      )}
    </div>
  );
}