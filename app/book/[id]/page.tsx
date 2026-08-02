"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Book } from "@/types/book";
import { useAuth } from "@/context/AuthContext";
import Skeleton from "@/components/Skeleton";
// Replace:
// import { AiOutlineBookmark, AiFillBookmark } from "react-icons/ai";

// With:
import { BsBookmark, BsBookmarkFill } from "react-icons/bs";

export default function IndividualBookPage() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  const { user, openAuthModal } = useAuth();
  const [isSubscribed] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function fetchSelectedBook() {
      try {
        const response = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`);
        const data = await response.json();
        setBook(data);

        // Check if book is saved in localStorage library
        const savedBooks = JSON.parse(localStorage.getItem("saved_books") || "[]");
        setIsSaved(savedBooks.some((b: Book) => b.id === data.id));
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSelectedBook();
  }, [id]);

  const handleToggleSave = () => {
    if (!user) {
      openAuthModal();
      return;
    }

    if (!book) return;

    const savedBooks: Book[] = JSON.parse(localStorage.getItem("saved_books") || "[]");
    if (isSaved) {
      const updated = savedBooks.filter((b) => b.id !== book.id);
      localStorage.setItem("saved_books", JSON.stringify(updated));
      setIsSaved(false);
    } else {
      savedBooks.push(book);
      localStorage.setItem("saved_books", JSON.stringify(savedBooks));
      setIsSaved(true);
    }
  };

  const handleMediaAccess = () => {
    if (!user) {
      openAuthModal();
      return;
    }

    if (book?.subscriptionRequired && !isSubscribed) {
      router.push("/choose-plan");
      return;
    }

    router.push(`/player/${book?.id}`);
  };

  if (loading) {
    return (
      <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{ display: "flex", gap: "40px", marginBottom: "32px" }}>
          {/* Book Cover Skeleton */}
          <Skeleton width="220px" height="320px" borderRadius="12px" />

          {/* Book Info Skeletons */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "12px" }}>
            <Skeleton height="36px" width="70%" />
            <Skeleton height="20px" width="40%" />
            <Skeleton height="18px" width="90%" />
            <div style={{ display: "flex", gap: "16px", marginTop: "16px" }}>
              <Skeleton height="44px" width="140px" borderRadius="8px" />
              <Skeleton height="44px" width="140px" borderRadius="8px" />
            </div>
          </div>
        </div>

        <hr style={{ border: "none", borderTop: "1px solid #eee", marginBottom: "32px" }} />
        <Skeleton height="24px" width="180px" style={{ marginBottom: "12px" }} />
        <Skeleton height="80px" width="100%" />
      </div>
    );
  }
  if (!book) return <div style={{ padding: "40px" }}>Book item asset profile not located.</div>;

  return (
    <div style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <div style={{ display: "flex", gap: "40px", marginBottom: "32px" }}>
        <img src={book.imageLink} alt={book.title} style={{ width: "220px", borderRadius: "12px", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", objectFit: "cover" }} />
        <div>
          <h1 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "8px" }}>{book.title}</h1>
          <p style={{ fontSize: "18px", color: "#555", marginBottom: "4px" }}>{book.author}</p>
          <p style={{ fontSize: "16px", color: "#777", marginBottom: "24px" }}>{book.subTitle}</p>

          <div style={{ display: "flex", gap: "16px", marginBottom: "24px" }}>
            <button onClick={handleMediaAccess} style={{ padding: "12px 24px", background: "#0369a1", color: "#fff", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
              Read Summary
            </button>
            <button onClick={handleMediaAccess} style={{ padding: "12px 24px", background: "#f1f6f4", color: "#0369a1", border: "1px solid #0369a1", borderRadius: "8px", fontWeight: "600", cursor: "pointer" }}>
              Listen Audio
            </button>
          </div>

          {/* SAVE TO LIBRARY BUTTON */}
          <button
            onClick={handleToggleSave}
            style={{
              display: "flex", alignItems: "center", gap: "8px", background: "none", border: "none",
              color: "#0369a1", cursor: "pointer", fontSize: "15px", fontWeight: "600"
            }}
          >
            {isSaved ? <BsBookmarkFill style={{ fontSize: "20px" }} /> : <BsBookmark style={{ fontSize: "20px" }} />}
            {isSaved ? "Saved in My Library" : "Add title to My Library"}
          </button>
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