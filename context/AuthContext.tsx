"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
  User
} from "firebase/auth";
import { RxCross2 } from "react-icons/rx";
import { BsPersonFill } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  isModalOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Authentication Form States
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const openAuthModal = () => {
    setIsModalOpen(true);
    setError("");
    setResetSent(false);
  };

  const closeAuthModal = () => {
    setIsModalOpen(false);
    setEmail("");
    setPassword("");
    setError("");
  };

  const logout = () => signOut(auth);

  const handleGuestLogin = async () => {
    setError("");
    try {
      await signInWithEmailAndPassword(auth, "guest@gmail.com", "guest123");
      closeAuthModal();
    } catch (err: any) {
      try {
        await createUserWithEmailAndPassword(auth, "guest@gmail.com", "guest123");
        closeAuthModal();
      } catch (createErr: any) {
        setError("Guest login failed: " + createErr.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      closeAuthModal();
    } catch (err: any) {
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError("Please enter your email address first.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetSent(true);
      setError("");
    } catch (err: any) {
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      closeAuthModal();
    } catch (err: any) {
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, isModalOpen, openAuthModal, closeAuthModal, logout }}>
      {children}

      {/* OVERLAY BACKDROP */}
      {isModalOpen && (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)", display: "flex",
          alignItems: "center", justifyContent: "center", zIndex: 10000,
          fontFamily: "sans-serif"
        }}>
          {/* MODAL CARD */}
          <div style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "400px",
            color: "#03314b",
            position: "relative",
            overflow: "hidden",
            boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
          }}>
            {/* CLOSE BUTTON */}
            <button
              onClick={closeAuthModal}
              style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", cursor: "pointer", color: "#000" }}
            >
              <RxCross2 style={{ fontSize: "24px" }} />
            </button>

            {/* CONTENT INNER CONTAINER */}
            <div style={{ padding: "32px 32px 24px 32px" }}>
              <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "24px", textAlign: "center", color: "#03314b" }}>
                {isSignUp ? "Sign up for Summarist" : "Log in to Summarist"}
              </h2>

              {error && (
                <div style={{ backgroundColor: "#fee2e2", color: "#dc2626", padding: "10px", borderRadius: "4px", fontSize: "13px", marginBottom: "16px" }}>
                  {error}
                </div>
              )}

              {resetSent && (
                <div style={{ backgroundColor: "#dcfce7", color: "#166534", padding: "10px", borderRadius: "4px", fontSize: "13px", marginBottom: "16px" }}>
                  Password reset email sent! Check your inbox.
                </div>
              )}

              {/* GUEST LOGIN BUTTON */}
              <button
                type="button"
                onClick={handleGuestLogin}
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#3b5199",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  fontWeight: "600",
                  fontSize: "15px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px"
                }}
              >
                <BsPersonFill style={{ fontSize: "20px" }} />
                Login as a Guest
              </button>

              {/* DIVIDER 1 */}
              <div style={{ display: "flex", alignItems: "center", margin: "16px 0" }}>
                <div style={{ flex: 1, borderBottom: "1px solid #e5e7eb" }}></div>
                <span style={{ padding: "0 12px", color: "#6b7280", fontSize: "13px" }}>or</span>
                <div style={{ flex: 1, borderBottom: "1px solid #e5e7eb" }}></div>
              </div>

              {/* GOOGLE LOGIN BUTTON */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                style={{
                  width: "100%",
                  padding: "12px",
                  backgroundColor: "#4285f4",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  fontWeight: "600",
                  fontSize: "15px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "12px"
                }}
              >
                <div style={{ backgroundColor: "#fff", borderRadius: "2px", padding: "4px", display: "flex" }}>
                  <FcGoogle style={{ fontSize: "18px" }} />
                </div>
                Login with Google
              </button>

              {/* DIVIDER 2 */}
              <div style={{ display: "flex", alignItems: "center", margin: "16px 0" }}>
                <div style={{ flex: 1, borderBottom: "1px solid #e5e7eb" }}></div>
                <span style={{ padding: "0 12px", color: "#6b7280", fontSize: "13px" }}>or</span>
                <div style={{ flex: 1, borderBottom: "1px solid #e5e7eb" }}></div>
              </div>

              {/* FORM FIELDS */}
              <form onSubmit={handleAuthSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <input
                  type="email" placeholder="Email Address" required value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    padding: "12px", borderRadius: "4px", border: "2px solid #bac8d3",
                    fontSize: "14px", outline: "none", color: "#03314b"
                  }}
                />
                <input
                  type="password" placeholder="Password" required value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    padding: "12px", borderRadius: "4px", border: "2px solid #bac8d3",
                    fontSize: "14px", outline: "none", color: "#03314b"
                  }}
                />

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  style={{
                    padding: "12px", backgroundColor: "#2bd97c", color: "#03314b",
                    border: "none", borderRadius: "4px", fontWeight: "600",
                    cursor: "pointer", fontSize: "16px", marginTop: "4px"
                  }}
                >
                  {isSignUp ? "Sign Up" : "Login"}
                </button>
              </form>

              {/* FORGOT PASSWORD */}
              {!isSignUp && (
                <div style={{ textAlign: "center", marginTop: "16px" }}>
                  <span
                    onClick={handleForgotPassword}
                    style={{ color: "#2563eb", cursor: "pointer", fontSize: "14px", fontWeight: "500" }}
                  >
                    Forgot your password?
                  </span>
                </div>
              )}
            </div>

            {/* FOOTER BAR */}
            <div style={{
              backgroundColor: "#f1f6f4",
              padding: "16px",
              textAlign: "center",
              fontSize: "14px",
              borderTop: "1px solid #e5e7eb"
            }}>
              <span
                onClick={() => { setIsSignUp(!isSignUp); setError(""); setResetSent(false); }}
                style={{ color: "#2563eb", cursor: "pointer", fontWeight: "500" }}
              >
                {isSignUp ? "Already have an account?" : "Don't have an account?"}
              </span>
            </div>

          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be executed within an AuthProvider setup shell");
  return context;
};