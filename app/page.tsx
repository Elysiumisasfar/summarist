"use client";
import React, { useState, useEffect } from "react";
import { auth, signOut } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import Navbar from "@/components/Navbar";
import Landing from "@/components/Landing";
import Features from "@/components/Features";
import Reviews from "@/components/Reviews";
import Numbers from "@/components/Numbers";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      {/* Pass modal management state handlers down natively to control actions inside layouts */}
      <Navbar onAuthOpen={() => setIsAuthOpen(true)} user={user} onLogout={() => signOut(auth)} />
      <Landing onAuthOpen={() => setIsAuthOpen(true)} user={user} />
      <Features />
      <Reviews onAuthOpen={() => setIsAuthOpen(true)} />
      <Numbers />
      <Footer />

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );

}