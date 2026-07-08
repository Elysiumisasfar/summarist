"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Book } from "@/types/book";

export default function IndividualBookPage() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock Authentication States (We will wire these directly to Firebase Auth later)
  const [isLoggedIn, setIsLoggedIn] = useState(true); 
  const [isSubscribed, setIsSubscribed] = useState(false); 

  useEffect(() => {
    if (!id) return;
    async function fetchSelectedBook() {
      try {
        const response = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`);
        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error("Failed to fetch target book configuration details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSelectedBook();
  }, [id]);

  const handleMediaAccess = () => {
    if (!isLoggedIn) {
      alert("Trigger Auth Modal Hook Open Sequence");
      return;
    }

    if (book?.subscriptionRequired && !isSubscribed) {
      router.push("/choose-plan");
      return;
    }

    router.push(`/player/${book?.id}`);
  };

  // Cleaned up the hardcoded margins from loading states
  if (loading) return <div style={{ padding: "40px" }}>Loading single item architecture view...</div>;
  if (!book) return <div style={{ padding: "40px" }}>Book item asset profile not located.</div>;

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ display: "flex", gap: "40px", marginBottom: "32px" }}>
        <img src={book.imageLink} alt={book.title} style={{ width: "220px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }} />
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "8px" }}>{book.title}</h1>
          <p style={{ fontSize: "18px", color: "#555", marginBottom: "4px" }}>{book.author}</p>
          <p style={{ fontSize: "16px", color: "#777", marginBottom: "24px" }}>{book.subTitle}</p>
          
          <div style={{ display: "flex", gap: "16px" }}>
            <button onClick={handleMediaAccess} style={{ padding: "12px 24px", background: "#0369a1", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
              Read Summary
            </button>
            <button onClick={handleMediaAccess} style={{ padding: "12px 24px", background: "#f1f6f4", color: "#0369a1", border: "1px solid #0369a1", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
              Listen Audio
            </button>
          </div>
        </div>
      </div>

      <hr style={{ border: "none", borderTop: "1px solid #eee", marginBottom: "32px" }} />
      
      <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "12px" }}>Book Description</h3>
      <p style={{ color: "#333", lineHeight: "1.6", marginBottom: "32px" }}>{book.bookDescription}</p>

      <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "12px" }}>About the Author</h3>
      <p style={{ color: "#333", lineHeight: "1.6" }}>{book.authorDescription}</p>
    </div>
  );
}