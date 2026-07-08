"use client";
import React from "react";
import { BsClock } from "react-icons/bs";
import { AiOutlineFileText } from "react-icons/ai";

interface BookPillProps {
  type: "duration" | "format" | "premium";
  value?: string;
}

const BookPill: React.FC<BookPillProps> = ({ type, value }) => {
  if (type === "premium") {
    return (
      <div style={{
        position: "absolute",
        top: "8px",
        right: "8px",
        background: "#0369a1",
        color: "#fff",
        padding: "2px 8px",
        borderRadius: "4px",
        fontSize: "10px",
        fontWeight: "600"
      }}>
        Premium
      </div>
    );
  }

  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      background: type === "duration" ? "#e0f2fe" : "#f3f4f6",
      color: type === "duration" ? "#0369a1" : "#4b5563",
      padding: "4px 10px",
      borderRadius: "20px",
      fontSize: "12px",
      fontWeight: "500"
    }}>
      {type === "duration" ? <BsClock style={{ fontSize: "12px" }} /> : <AiOutlineFileText style={{ fontSize: "13px" }} />}
      <span>{value}</span>
    </div>
  );
};

export default BookPill;