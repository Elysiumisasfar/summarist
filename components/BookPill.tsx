import React from "react";
// 1. Fix the import path to pull from sub-libraries ('bs' and 'ai')
import { BsClock } from "react-icons/bs";
import { AiOutlineFileText } from "react-icons/ai";

interface BookPillProps {
  type: "duration" | "format";
  value: string;
}

const BookPill: React.FC<BookPillProps> = ({ type, value }) => {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        background: type === "duration" ? "#e0f2fe" : "#f3f4f6",
        color: type === "duration" ? "#0369a1" : "#4b5563",
        padding: "4px 10px",
        borderRadius: "20px",
        fontSize: "12px",
        fontWeight: "500",
        width: "fit-content"
      }}
    >
      {/* 2. Swap out the generic text icons for the crisp vector icons */}
      {type === "duration" ? <BsClock style={{ fontSize: "12px" }} /> : <AiOutlineFileText style={{ fontSize: "13px" }} />}
      {value}
    </div>
  );
};

export default BookPill;