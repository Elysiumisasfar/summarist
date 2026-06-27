"use client";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { IoMdPerson } from "react-icons/io";
import { 
  auth, 
  googleProvider, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail, 
  signInAnonymously 
} from "@/lib/firebase";
import { signInWithPopup } from "firebase/auth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type AuthView = "login" | "register" | "forgot-password";

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [view, setView] = useState<AuthView>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  if (!isOpen) return null;

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      if (view === "login") {
        await signInWithEmailAndPassword(auth, email, password);
        onClose();
      } else if (view === "register") {
        await createUserWithEmailAndPassword(auth, email, password);
        onClose();
      } else if (view === "forgot-password") {
        await sendPasswordResetEmail(auth, email);
        setMessage("A password reset link has been dispatched to your inbox.");
      }
    } catch (err: any) {
      setError(err.message.replace("Firebase: ", ""));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleGuestLogin = async () => {
    try {
      await signInAnonymously(auth);
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <button className="auth-modal__close" onClick={onClose}>
          <AiOutlineClose />
        </button>

        {error && <div className="auth-error">{error}</div>}
        {message && <div className="auth-success">{message}</div>}

        <h2 className="auth-modal__title">
          {view === "login" && "Log in to Summarist"}
          {view === "register" && "Create an account"}
          {view === "forgot-password" && "Reset Password"}
        </h2>

        {/* Guest Action Option */}
        {view !== "forgot-password" && (
          <button className="btn btn-guest" onClick={handleGuestLogin}>
            <IoMdPerson className="auth-icon" /> Log in as Guest
          </button>
        )}

        {/* Google OAuth Option */}
        {view !== "forgot-password" && (
          <button className="btn btn-google" onClick={handleGoogleLogin}>
            <FcGoogle className="auth-icon" /> Log in with Google
          </button>
        )}

        {view !== "forgot-password" && <div className="auth-divider">or</div>}

        <form onSubmit={handleEmailAuth} className="auth-form">
          <input
            type="email"
            placeholder="Email Address"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {view !== "forgot-password" && (
            <input
              type="password"
              placeholder="Password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          )}

          <button type="submit" className="btn btn-submit">
            {view === "login" && "Log In"}
            {view === "register" && "Register"}
            {view === "forgot-password" && "Send Reset Link"}
          </button>
        </form>

        {/* Dynamic Modal View Switching Toggles */}
        <div className="auth-modal__footer">
          {view === "login" && (
            <>
              <span onClick={() => setView("forgot-password")} className="auth-toggle">Forgot Password?</span>
              <p>Don't have an account? <span onClick={() => setView("register")} className="auth-toggle">Register</span></p>
            </>
          )}
          {view === "register" && (
            <p>Already have an account? <span onClick={() => setView("login")} className="auth-toggle">Log In</span></p>
          )}
          {view === "forgot-password" && (
            <span onClick={() => setView("login")} className="auth-toggle">Back to Log In</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;