"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BookPill from "@/components/BookPill";
import { Book } from "@/types/book"; 

export default function ForYouPage() {
  const router = useRouter();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDashboardData() {
      try {
        setLoading(true);
        const [resSelected, resRec, resSugg] = await Promise.all([
          fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"),
          fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"),
          fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested")
        ]);

        const selectedData = await resSelected.json();
        const recData = await resRec.json();
        const suggData = await resSugg.json();

        setSelectedBook(Array.isArray(selectedData) ? selectedData[0] : selectedData);
        setRecommendedBooks(recData);
        setSuggestedBooks(suggData);
      } catch (error) {
        console.error("Error fetching book data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDashboardData();
  }, []);

  const handleBookClick = (id: string) => {
    router.push(`/book/${id}`);
  };

  // Clean loading template matching the new workspace
  if (loading) {
    return (
      <div style={{ padding: "40px" }}>
        <h2 style={{ fontSize: "24px", color: "#ccc" }}>Loading your personalized feed...</h2>
      </div>
    );
  }

  return (
    <div className="for-you__wrapper" style={{ 
      padding: "40px", 
      maxWidth: "1200px", 
      margin: "0 auto",
      width: "100%"
    }}>
      
      {/* SELECTED BOOK HERO */}
      {selectedBook && (
        <section style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "16px", fontWeight: "700" }}>Selected Book</h2>
          <div 
            onClick={() => handleBookClick(selectedBook.id)}
            style={{ display: "flex", gap: "24px", background: "#f1f6f4", padding: "24px", borderRadius: "12px", cursor: "pointer", position: "relative" }}
          >
            {selectedBook.subscriptionRequired && <BookPill type="premium" />}
            <img src={selectedBook.imageLink} alt={selectedBook.title} style={{ width: "140px", borderRadius: "8px", objectFit: "cover" }} />
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "4px" }}>{selectedBook.title}</h3>
                <p style={{ color: "#555", fontSize: "14px", marginBottom: "8px" }}>{selectedBook.author}</p>
                <p style={{ color: "#333", fontSize: "16px" }}>{selectedBook.subTitle}</p>
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                <BookPill type="format" value={selectedBook.type} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* RECOMMENDED BOOKS */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "16px", fontWeight: "700" }}>Recommended Books</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "24px" }}>
          {recommendedBooks.map((book) => (
            <div 
              key={book.id} 
              onClick={() => handleBookClick(book.id)}
              style={{ border: "1px solid #e5e7eb", padding: "16px", borderRadius: "12px", background: "#fff", cursor: "pointer", position: "relative" }}
            >
              {book.subscriptionRequired && <BookPill type="premium" />}
              <img src={book.imageLink} alt={book.title} style={{ width: "100%", height: "260px", borderRadius: "8px", objectFit: "cover", marginBottom: "12px" }} />
              <h4 style={{ fontWeight: "600", fontSize: "16px", marginBottom: "4px" }}>{book.title}</h4>
              <p style={{ color: "#777", fontSize: "13px", marginBottom: "8px" }}>{book.author}</p>
              <BookPill type="format" value={book.type} />
            </div>
          ))}
        </div>
      </section>

      {/* SUGGESTED BOOKS */}
      <section style={{ marginBottom: "48px" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "16px", fontWeight: "700" }}>Suggested Books</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {suggestedBooks.map((book) => (
            <div 
              key={book.id} 
              onClick={() => handleBookClick(book.id)}
              style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", border: "1px solid #eee", borderRadius: "8px", cursor: "pointer", position: "relative" }}
            >
              <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
                <img src={book.imageLink} alt={book.title} style={{ width: "50px", height: "75px", borderRadius: "4px", objectFit: "cover" }} />
                <div>
                  <h4 style={{ fontWeight: "600" }}>{book.title}</h4>
                  <p style={{ color: "#777", fontSize: "13px" }}>{book.author}</p>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <BookPill type="format" value={book.type} />
                {book.subscriptionRequired && <span style={{ color: "#0369a1", fontSize: "12px", fontWeight: "bold" }}>Premium</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}