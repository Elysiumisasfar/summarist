"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {
    const router = useRouter();
    const { user, openAuthModal, loading } = useAuth();

    // Mock subscription state — in production, this can be synced with Firebase Firestore / Stripe webhook context
    const subscriptionStatus = "Basic";

    if (loading) {
        return (
            <div style={{ padding: "40px 24px", maxWidth: "1070px", margin: "0 auto", fontFamily: "sans-serif", color: "#6b7280" }}>
                Loading settings...
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
            <h1 style={{ fontSize: "32px", fontWeight: "700", marginBottom: "32px", borderBottom: "1px solid #e5e7eb", paddingBottom: "16px" }}>
                Settings
            </h1>

            {!user ? (
                /* UNAUTHENTICATED STATE */
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "60px 20px",
                    textAlign: "center",
                    backgroundColor: "#f9fafb",
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb"
                }}>
                    <img
                        src="/login-illustration.png"
                        alt="Log in required"
                        style={{ width: "220px", marginBottom: "24px", opacity: 0.8 }}
                        onError={(e) => {
                            // Fallback if local image asset isn't present
                            (e.target as HTMLImageElement).style.display = "none";
                        }}
                    />
                    <h2 style={{ fontSize: "22px", fontWeight: "700", marginBottom: "8px" }}>
                        Log in to view your settings
                    </h2>
                    <p style={{ color: "#6b7280", fontSize: "15px", marginBottom: "24px", maxWidth: "400px" }}>
                        Manage your account preferences, email address, and active subscription details.
                    </p>
                    <button
                        onClick={openAuthModal}
                        style={{
                            padding: "12px 32px",
                            backgroundColor: "#2bd97c",
                            color: "#03314b",
                            border: "none",
                            borderRadius: "4px",
                            fontWeight: "600",
                            fontSize: "16px",
                            cursor: "pointer"
                        }}
                    >
                        Log In
                    </button>
                </div>
            ) : (
                /* AUTHENTICATED STATE */
                <div style={{ display: "flex", flexDirection: "column", gap: "32px", maxWidth: "600px" }}>

                    {/* SUBSCRIPTION PLAN CARD */}
                    <div style={{
                        borderBottom: "1px solid #e5e7eb",
                        paddingBottom: "24px"
                    }}>
                        <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px" }}>
                            Your Subscription Plan
                        </h3>

                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                            <span style={{ fontSize: "16px", fontWeight: "600", color: subscriptionStatus === "Basic" ? "#4b5563" : "#0284c7" }}>
                                {subscriptionStatus} Plan
                            </span>

                            {subscriptionStatus === "Basic" && (
                                <button
                                    onClick={() => router.push("/choose-plan")}
                                    style={{
                                        padding: "10px 20px",
                                        backgroundColor: "#2563eb",
                                        color: "#fff",
                                        border: "none",
                                        borderRadius: "4px",
                                        fontWeight: "600",
                                        fontSize: "14px",
                                        cursor: "pointer"
                                    }}
                                >
                                    Upgrade to Premium
                                </button>
                            )}
                        </div>

                        {subscriptionStatus === "Basic" && (
                            <p style={{ fontSize: "14px", color: "#6b7280", margin: 0 }}>
                                Upgrade to Premium to unlock unlimited access to audio summaries and full book content.
                            </p>
                        )}
                    </div>

                    {/* USER EMAIL CARD */}
                    <div>
                        <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px" }}>
                            Email Address
                        </h3>
                        <p style={{ fontSize: "16px", color: "#374151", margin: 0, fontWeight: "500" }}>
                            {user.email}
                        </p>
                    </div>

                </div>
            )}
        </div>
    );
}