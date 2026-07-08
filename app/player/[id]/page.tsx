"use client";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { Book } from "@/types/book";
import { 
  BsPlayCircleFill, 
  BsPauseCircleFill, 
  BsArrowLeftShort, 
  BsArrowRightShort 
} from "react-icons/bs";

export default function AudioPlayerPage() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Audio playback state variables
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  // References to track the HTMLAudioElement and animation frames
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressBarRef = useRef<HTMLInputElement | null>(null);
  const animationRef = useRef<number | null>(null);

  // 1. Fetch targeted book meta assets from cloud function endpoint
  useEffect(() => {
    if (!id) return;
    async function fetchPlayerBook() {
      try {
        const res = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`);
        const data = await res.json();
        setBook(data);
      } catch (error) {
        console.error("Failed to load player media resource:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPlayerBook();
  }, [id]);

  // 2. Format numerical seconds into clean readable strings (e.g., 04:52)
  const formatTime = (time: number) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  // 3. Keep progress bar track position synced while audio streams
  const updateProgress = () => {
    if (audioRef.current && progressBarRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      animationRef.current = requestAnimationFrame(updateProgress);
    }
  };

  // 4. Handle Master Play / Pause logic toggles
  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
      animationRef.current = requestAnimationFrame(updateProgress);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    }
  };

  // 5. Scrub tracking when the user drags the input range element
  const handleScrubChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!audioRef.current) return;
    const newTime = parseFloat(e.target.value);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // 6. Fast Skip controls (10 seconds backward or forward)
  const skipBackward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 10);
  };

  const skipForward = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 10);
  };

  // Clean up animation loops on component unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Removed hardcoded margins because layout.tsx treats this area as a natural flex column row container now
  if (loading) return <div style={{ padding: "40px" }}>Initializing media audio framework...</div>;
  if (!book) return <div style={{ padding: "40px" }}>Media stream asset target missing.</div>;

  return (
    <>
      {/* Underlying Hidden Native Audio Engine element */}
      <audio 
        ref={audioRef} 
        src={book.audioLink} 
        onLoadedMetadata={() => {
          if (audioRef.current) setDuration(audioRef.current.duration);
        }}
        onEnded={() => {
          setIsPlaying(false);
          if (animationRef.current) cancelAnimationFrame(animationRef.current);
        }}
      />

      {/* Main Content Layout Block */}
      <div style={{ 
        padding: "40px", 
        paddingBottom: "140px", 
        maxWidth: "800px", 
        margin: "0 auto" 
      }}>
        <h1 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "12px", borderBottom: "1px solid #f3f4f6", paddingBottom: "16px" }}>
          {book.title}
        </h1>

        <div style={{ 
          whiteSpace: "pre-line", 
          lineHeight: "1.7", 
          color: "#374151", 
          fontSize: "16px" 
        }}>
          {book.summary}
        </div>
      </div>

      {/* FIXED BOTTOM AUDIO CONTROLLER BAR */}
      <footer style={{
        position: "fixed",
        bottom: 0,
        left: "280px", // Maintains perfect positioning right up against the global sticky sidebar boundary
        right: 0,
        height: "100px",
        backgroundColor: "#042330", 
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        zIndex: 200
      }}>
        {/* Left Side: Thumbnail Preview */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", width: "25%" }}>
          <img src={book.imageLink} alt={book.title} style={{ width: "48px", height: "48px", borderRadius: "4px", objectFit: "cover" }} />
          <div style={{ minWidth: 0 }}>
            <h4 style={{ fontSize: "14px", fontWeight: "600", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{book.title}</h4>
            <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{book.author}</p>
          </div>
        </div>

        {/* Center Section: Core Controls & Slider */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", width: "50%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <button onClick={skipBackward} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>
              <BsArrowLeftShort style={{ fontSize: "32px" }} />
            </button>
            
            <button onClick={togglePlayPause} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>
              {isPlaying ? <BsPauseCircleFill style={{ fontSize: "44px" }} /> : <BsPlayCircleFill style={{ fontSize: "44px" }} />}
            </button>

            <button onClick={skipForward} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer" }}>
              <BsArrowRightShort style={{ fontSize: "32px" }} />
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", width: "100%", gap: "12px" }}>
            <span style={{ fontSize: "12px", color: "#9ca3af", width: "40px", textAlign: "right" }}>{formatTime(currentTime)}</span>
            <input 
              type="range"
              ref={progressBarRef}
              min={0}
              max={duration || 100}
              value={currentTime}
              onChange={handleScrubChange}
              style={{
                flexGrow: 1,
                accentColor: "#2563eb",
                height: "4px",
                cursor: "pointer"
              }}
            />
            <span style={{ fontSize: "12px", color: "#9ca3af", width: "40px" }}>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Balance Element */}
        <div style={{ width: "25%" }}></div>
      </footer>
    </>
  );
}