"use client";
import React from "react";
import BookPill from "@/components/BookPill";
import Sidebar from "@/components/Sidebar";

const mockSelectedBook = {
  title: "Atomic Habits",
  author: "James Clear",
  subTitle: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
  duration: "14 mins",
  type: "Audio & Text",
  imgUrl: "https://images-na.ssl-images-amazon.com/images/I/81wgcld4wxL.jpg"
};

const mockBooksList = [
  { id: 1, title: "The Lean Startup", author: "Eric Ries", duration: "12 mins", type: "Audio" },
  { id: 2, title: "Deep Work", author: "Cal Newport", duration: "15 mins", type: "Audio & Text" },
  { id: 3, title: "Zero to One", author: "Peter Thiel", duration: "11 mins", type: "Text Only" },
];

export default function ForYouPage() {
  return (
    <div className="for-you__container" style={{ display: "flex" }}>
      <Sidebar />
          
      {/* OPEN THE WRAPPER CONTAINER */}
      <div className="for-you__wrapper" style={{ 
        padding: "40px", 
        maxWidth: "1200px", 
        margin: "0 auto",
        marginLeft: "280px", 
        flexGrow: 1 
      }}>
      
        {/* SECTION 1: SELECTED BOOK HERO */}
        <section className="selected-book__section" style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "16px", fontWeight: "700" }}>Selected Book</h2>
          <div className="selected-book__card" style={{ display: "flex", gap: "24px", background: "#f1f6f4", padding: "24px", borderRadius: "12px" }}>
            <img src={mockSelectedBook.imgUrl} alt={mockSelectedBook.title} style={{ width: "140px", borderRadius: "8px", objectFit: "cover" }} />
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "4px" }}>{mockSelectedBook.title}</h3>
                <p style={{ color: "#555", fontSize: "14px", marginBottom: "8px" }}>{mockSelectedBook.author}</p>
                <p style={{ color: "#333", fontSize: "16px" }}>{mockSelectedBook.subTitle}</p>
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "16px" }}>
                <BookPill type="duration" value={mockSelectedBook.duration} />
                <BookPill type="format" value={mockSelectedBook.type} />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: RECOMMENDED BOOKS */}
        <section className="recommended__section" style={{ marginBottom: "48px" }}>
          <h2 style={{ fontSize: "24px", marginBottom: "16px", fontWeight: "700" }}>Recommended Books</h2>
          <div className="books__grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "24px" }}>
            {mockBooksList.map((book) => (
              <div key={book.id} style={{ border: "1px solid #e5e7eb", padding: "16px", borderRadius: "12px", background: "#fff" }}>
                <div style={{ width: "100%", height: "200px", background: "#e5e7eb", borderRadius: "8px", marginBottom: "12px" }}></div>
                <h4 style={{ fontWeight: "600", fontSize: "16px", marginBottom: "4px" }}>{book.title}</h4>
                <p style={{ color: "#777", fontSize: "13px", marginBottom: "8px" }}>{book.author}</p>
                <BookPill type="duration" value={book.duration} />
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: SUGGESTED BOOKS */}
        <section className="suggested__section">
          <h2 style={{ fontSize: "24px", marginBottom: "16px", fontWeight: "700" }}>Suggested Books</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {mockBooksList.slice(0, 2).map((book) => (
              <div key={book.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px", borderBottom: "1px solid #eee" }}>
                <div>
                  <h4 style={{ fontWeight: "600" }}>{book.title}</h4>
                  <p style={{ color: "#777", fontSize: "13px" }}>{book.author}</p>
                </div>
                <BookPill type="format" value={book.type} />
              </div>
            ))}
          </div>
        </section>

      </div> {/* CLOSE THE WRAPPER CONTAINER HERE INSTEAD */}
    </div>
  );
}