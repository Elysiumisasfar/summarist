"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Book } from "@/types/book";
import { AiOutlineClockCircle, AiOutlineStar, AiOutlineAudio } from "react-icons/ai";
import Skeleton from "@/components/Skeleton";

export default function ForYouPage() {
  const router = useRouter();
  const { user, openAuthModal, loading: authLoading } = useAuth();

  const [recommendedBooks, setRecommendedBooks] = useState<Book[]>([]);
  const [suggestedBooks, setSuggestedBooks] = useState<Book[]>([]);
  const [dailyBook, setDailyBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. Fetch content from the backend cloud endpoints
  useEffect(() => {
    async function fetchDashboardContent() {
      try {
        const response = await fetch("https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended");
        const data = await response.json();

        setRecommendedBooks(data.slice(0, 5));
        setSuggestedBooks(data.slice(5, 10));
        if (data.length > 0) {
          setDailyBook(data[0]); // Establish prime position card showcase
        }
      } catch (error) {
        console.error("Error loading dashboard metrics:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardContent();
  }, []);

  if (authLoading || loading) {
    return (
      <div style={{ maxWidth: "1070px", margin: "0 auto", padding: "40px 24px" }}>
        {/* Hero Skeleton */}
        <Skeleton height="24px" width="220px" style={{ marginBottom: "16px" }} />
        <Skeleton height="200px" borderRadius="12px" style={{ marginBottom: "48px" }} />

        {/* Recommended Section Skeleton */}
        <Skeleton height="24px" width="200px" style={{ marginBottom: "8px" }} />
        <Skeleton height="16px" width="300px" style={{ marginBottom: "20px" }} />
        <div style={{ display: "flex", gap: "20px" }}>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} style={{ width: "180px", flexShrink: 0 }}>
              <Skeleton height="260px" borderRadius="8px" style={{ marginBottom: "8px" }} />
              <Skeleton height="18px" width="80%" style={{ marginBottom: "6px" }} />
              <Skeleton height="14px" width="50%" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{
      maxWidth: "1070px",
      margin: "0 auto",
      padding: "40px 24px",
      fontFamily: "sans-serif",
      color: "#03314b"
    }}>

      {/* SECTION 1: SELECTED DAILY SUMMARY HERO */}
      <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "16px" }}>Selected Daily Summary</h2>
      {dailyBook && (
        <div
          onClick={() => router.push(`/book/${dailyBook.id}`)}
          style={{
            display: "flex",
            gap: "24px",
            backgroundColor: "#fb923c", // Vibrant highlight contrast background
            padding: "24px",
            borderRadius: "12px",
            color: "#fff",
            cursor: "pointer",
            marginBottom: "48px",
            boxShadow: "0 4px 12px rgba(251, 146, 60, 0.15)"
          }}
        >
          <img
            src={dailyBook.imageLink || "/placeholder-book.png"}
            alt={dailyBook.title}
            style={{ width: "120px", height: "180px", borderRadius: "6px", objectFit: "cover", boxShadow: "0 4px 6px rgba(0,0,0,0.1)" }}
          />
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ margin: "0 0 6px 0", fontSize: "18px", fontWeight: "700" }}>{dailyBook.title}</h3>
              <p style={{ margin: "0 0 12px 0", fontSize: "14px", color: "#ffedd5" }}>{dailyBook.author}</p>
              <p style={{ margin: 0, fontSize: "14px", opacity: 0.9, lineHeight: "1.5", maxWidth: "600px" }}>
                {dailyBook.subTitle || "Expand your horizons with key interactive insights extracted directly into a focused summary format."}
              </p>
            </div>

            <div style={{ display: "flex", gap: "16px", fontSize: "13px", alignItems: "center" }}>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <AiOutlineClockCircle /> 15 min read
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                <AiOutlineAudio /> Audio available
              </span>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: RECOMMENDED BOOKS SLIDER CONTAINER */}
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "6px" }}>Recommended For You</h2>
        <p style={{ margin: "0 0 20px 0", color: "#6b7280", fontSize: "14px" }}>We think you’ll like these structural breakdowns:</p>

        <div style={{ display: "flex", gap: "20px", overflowX: "auto", paddingBottom: "12px" }}>
          {recommendedBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => router.push(`/book/${book.id}`)}
              style={{ flexShrink: 0, width: "180px", cursor: "pointer" }}
            >
              <div style={{ position: "relative", marginBottom: "8px" }}>
                <img
                  src={book.imageLink}
                  alt={book.title}
                  style={{ width: "100%", height: "260px", borderRadius: "8px", objectFit: "cover" }}
                />
                {book.subscriptionRequired && (
                  <span style={{
                    position: "absolute", top: "8px", right: "8px",
                    backgroundColor: "#0369a1", color: "#fff", fontSize: "11px",
                    fontWeight: "600", padding: "4px 8px", borderRadius: "9999px"
                  }}>
                    Premium
                  </span>
                )}
              </div>
              <h4 style={{ margin: "0 0 4px 0", fontSize: "15px", fontWeight: "700", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                {book.title}
              </h4>
              <p style={{ margin: 0, fontSize: "13px", color: "#6b7280" }}>{book.author}</p>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 3: SUGGESTED READS */}
      <div>
        <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "20px" }}>Suggested Reads</h2>
        <div style={{ display: "flex", gap: "20px", overflowX: "auto", paddingBottom: "12px" }}>
          {suggestedBooks.map((book) => (
            <div
              key={book.id}
              onClick={() => router.push(`/book/${book.id}`)}
              style={{ flexShrink: 0, width: "180px", cursor: "pointer" }}
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
      </div>

    </div>
  );
}