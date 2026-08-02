"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { Book } from "@/types/book";
import { useAuth } from "@/context/AuthContext";
import {
  BsPlayCircleFill,
  BsPauseCircleFill,
  BsArrowLeft,
  BsArrowCounterclockwise,
  BsArrowClockwise
} from "react-icons/bs";

export default function PlayerPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();

  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);

  // Audio Player State
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // Fetch Book Data
  useEffect(() => {
    if (!id) return;
    async function fetchBookData() {
      try {
        const res = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`);
        const data = await res.json();
        setBook(data);
      } catch (err) {
        console.error("Error fetching player book data:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchBookData();
  }, [id]);

  // Format Seconds into MM:SS
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Audio Control Handlers
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);

    if (!book) return;

    // Retrieve current finished books from localStorage
    const finishedBooks: Book[] = JSON.parse(localStorage.getItem("finished_books") || "[]");

    // Check if it's already marked as finished to avoid duplicates
    const alreadyFinished = finishedBooks.some((b) => b.id === book.id);

    if (!alreadyFinished) {
      finishedBooks.push(book);
      localStorage.setItem("finished_books", JSON.stringify(finishedBooks));
    }
  };

  const skipTime = (seconds: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        Math.max(audioRef.current.currentTime + seconds, 0),
        duration
      );
    }
  };

  if (loading || authLoading) {
    return <div style={{ padding: "40px", fontFamily: "sans-serif", color: "#666" }}>Loading player...</div>;
  }

  if (!book) {
    return <div style={{ padding: "40px", fontFamily: "sans-serif" }}>Book content not found.</div>;
  }

  return (
    <div style={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "32px 24px 120px 24px", // Bottom padding ensures audio bar doesn't overlap text
      fontFamily: "sans-serif",
      color: "#03314b"
    }}>
      {/* Hidden Native Audio Element */}
      {book.audioLink && (
        <audio
          ref={audioRef}
          src={book.audioLink}
          onLoadedMetadata={() => {
            if (audioRef.current) setDuration(audioRef.current.duration);
          }}
          onTimeUpdate={() => {
            if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
          }}
          onEnded={handleAudioEnded} // <--- Wire function here
        />
      )}

      {/* TOP NAV / TITLE HEADER */}
      <button
        onClick={() => router.back()}
        style={{
          display: "flex", alignItems: "center", gap: "8px", background: "none",
          border: "none", color: "#0369a1", cursor: "pointer", fontSize: "15px",
          fontWeight: "600", marginBottom: "24px", padding: 0
        }}
      >
        <BsArrowLeft style={{ fontSize: "18px" }} /> Back
      </button>

      <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "8px" }}>{book.title}</h1>
      <p style={{ fontSize: "16px", color: "#6b7280", marginBottom: "24px" }}>By {book.author}</p>

      <hr style={{ border: "none", borderTop: "1px solid #e5e7eb", marginBottom: "32px" }} />

      {/* SUMMARY TEXT DISPLAY */}
      <div style={{
        fontSize: "16px",
        lineHeight: "1.8",
        color: "#1f2937",
        whiteSpace: "pre-line" // Preserves summary paragraphs
      }}>
        {book.summary || "No text summary available for this item."}
      </div>

      {/* FIXED BOTTOM AUDIO PLAYER BAR */}
      <div style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#042330",
        color: "#fff",
        padding: "16px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "20px",
        boxShadow: "0 -4px 12px rgba(0,0,0,0.15)",
        zIndex: 9999
      }}>
        {/* BOOK INFO MINI */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: "200px" }}>
          {book.imageLink && (
            <img src={book.imageLink} alt={book.title} style={{ width: "48px", height: "48px", borderRadius: "4px", objectFit: "cover" }} />
          )}
          <div>
            <h4 style={{ margin: 0, fontSize: "14px", fontWeight: "600", color: "#fff" }}>{book.title}</h4>
            <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "#9ca3af" }}>{book.author}</p>
          </div>
        </div>

        {/* CONTROLS & PROGRESS BAR */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", flexGrow: 1, maxWidth: "500px" }}>

          {/* CONTROL BUTTONS */}
          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <button
              onClick={() => skipTime(-10)}
              style={{ background: "none", border: "none", color: "#d1d5db", cursor: "pointer", fontSize: "20px", display: "flex" }}
              title="Rewind 10s"
            >
              <BsArrowCounterclockwise />
            </button>

            <button
              onClick={togglePlayPause}
              style={{ background: "none", border: "none", color: "#2bd97c", cursor: "pointer", fontSize: "36px", display: "flex" }}
            >
              {isPlaying ? <BsPauseCircleFill /> : <BsPlayCircleFill />}
            </button>

            <button
              onClick={() => skipTime(10)}
              style={{ background: "none", border: "none", color: "#d1d5db", cursor: "pointer", fontSize: "20px", display: "flex" }}
              title="Forward 10s"
            >
              <BsArrowClockwise />
            </button>
          </div>

          {/* TIMERS & SLIDER */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "100%", fontSize: "12px", color: "#9ca3af" }}>
            <span>{formatTime(currentTime)}</span>
            <input
              type="range"
              min={0}
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              style={{ flexGrow: 1, cursor: "pointer", accentColor: "#2bd97c" }}
            />
            <span>{formatTime(duration)}</span>
          </div>

        </div>

        {/* SPACER FOR BALANCE */}
        <div style={{ width: "200px" }} />
      </div>

    </div>
  );
}