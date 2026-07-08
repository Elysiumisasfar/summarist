"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineCheckCircle, AiFillCheckCircle } from "react-icons/ai";
import { IoMdBook } from "react-icons/io";

export default function ChoosePlanPage() {
  const router = useRouter();
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "yearly">("yearly");

  const handleCheckoutRedirect = () => {
    alert(`Initiating Stripe Sandbox Checkout sequence for the ${selectedPlan.toUpperCase()} plan tier...`);
    // This hook will handle window.location.assign(stripe_checkout_url) later
  };

  return (
    <div style={{ 
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 9999, 
      backgroundColor: "#042330", 
      overflowY: "auto",
      fontFamily: "sans-serif", 
      color: "#fff",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "40px 20px"
    }}>
      
      {/* Upper Brand / Pitch Section */}
      <div style={{ textAlign: "center", marginBottom: "32px", maxWidth: "650px", marginTop: "20px" }}>
        <h1 style={{ fontSize: "34px", fontWeight: "700", marginBottom: "12px", lineHeight: "1.2" }}>
          Get unlimited access to <br/>many amazing books
        </h1>
        <p style={{ color: "#9ca3af", fontSize: "16px", margin: "0" }}>
          Turn lengthy books into 15-minute structural summaries.
        </p>
      </div>

      {/* CORE SUBSCRIPTION CARD PLATFORM */}
      <div style={{ 
        background: "#fff", 
        color: "#111827", 
        padding: "36px", 
        borderRadius: "16px", 
        width: "100%", 
        maxWidth: "540px",
        boxShadow: "0 20px 25px -5px rgba(0,0,0,0.4)"
      }}>
        
        {/* Core Value Stack Features */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "32px" }}>
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <IoMdBook style={{ fontSize: "24px", color: "#0369a1", flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.4" }}>
              <strong>Premium Library Access:</strong> Unlock every audio and text track seamlessly.
            </p>
          </div>
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <IoMdBook style={{ fontSize: "24px", color: "#0369a1", flexShrink: 0 }} />
            <p style={{ margin: 0, fontSize: "15px", lineHeight: "1.4" }}>
              <strong>Offline Mode Support:</strong> Download and stream keys from any browser tab window.
            </p>
          </div>
        </div>

        <h3 style={{ textAlign: "center", margin: "0 0 20px 0", fontSize: "18px", fontWeight: "600", color: "#374151" }}>
          Choose the plan that fits you best
        </h3>

        {/* PLAN 1: YEARLY INSIGHT MEMBERSHIP */}
        <div 
          onClick={() => setSelectedPlan("yearly")}
          style={{
            border: selectedPlan === "yearly" ? "3px solid #2563eb" : "2px solid #e5e7eb",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "16px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            backgroundColor: selectedPlan === "yearly" ? "#f0fdf4" : "#fff",
            transition: "all 0.2s ease"
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            {selectedPlan === "yearly" ? (
              <AiFillCheckCircle style={{ fontSize: "24px", color: "#2563eb" }} />
            ) : (
              <AiOutlineCheckCircle style={{ fontSize: "24px", color: "#9ca3af" }} />
            )}
            <div>
              <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "700" }}>Summarist Yearly Membership</h4>
              <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#4b5563" }}>Only $99.99/year (~$8.33/mo)</p>
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "14px", fontWeight: "bold", color: "#16a34a", backgroundColor: "#dcfce7", padding: "4px 8px", borderRadius: "9999px" }}>
              Save 40%
            </span>
          </div>
        </div>

        {/* PLAN 2: MONTHLY FLEX MEMBERSHIP */}
        <div 
          onClick={() => setSelectedPlan("monthly")}
          style={{
            border: selectedPlan === "monthly" ? "3px solid #2563eb" : "2px solid #e5e7eb",
            borderRadius: "12px",
            padding: "20px",
            marginBottom: "32px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            backgroundColor: selectedPlan === "monthly" ? "#fbfbfe" : "#fff",
            transition: "all 0.2s ease"
          }}
        >
          {selectedPlan === "monthly" ? (
            <AiFillCheckCircle style={{ fontSize: "24px", color: "#2563eb" }} />
          ) : (
            <AiOutlineCheckCircle style={{ fontSize: "24px", color: "#9ca3af" }} />
          )}
          <div>
            <h4 style={{ margin: 0, fontSize: "16px", fontWeight: "700" }}>Summarist Monthly Membership</h4>
            <p style={{ margin: "4px 0 0 0", fontSize: "13px", color: "#4b5563" }}>$14.99/month. Cancel anytime.</p>
          </div>
        </div>

        {/* CALL TO ACTION ACTIONS BLOCK */}
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <button 
            onClick={handleCheckoutRedirect}
            style={{ 
              width: "100%", 
              padding: "14px", 
              backgroundColor: "#2563eb", 
              color: "#fff", 
              border: "none", 
              borderRadius: "8px", 
              fontWeight: "600", 
              fontSize: "16px",
              cursor: "pointer",
              boxShadow: "0 4px 6px -1px rgba(37, 99, 235, 0.2)"
            }}
          >
            Proceed to Secure Checkout
          </button>

          <button 
            onClick={() => router.back()} 
            style={{ 
              width: "100%", 
              padding: "10px", 
              backgroundColor: "transparent", 
              color: "#4b5563", 
              border: "none", 
              fontWeight: "500", 
              fontSize: "14px",
              cursor: "pointer" 
            }}
          >
            Back to Book Profile
          </button>
        </div>

      </div>
    </div>
  );
}