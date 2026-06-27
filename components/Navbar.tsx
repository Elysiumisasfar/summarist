"use client";
import React from "react";
import Image from "next/image";
import { User } from "firebase/auth";

// 1. Define what properties this component is allowed to receive
interface NavbarProps {
  onAuthOpen: () => void;
  user: User | null;
  onLogout: () => void;
}

// 2. Pass the props into the component function
const Navbar: React.FC<NavbarProps> = ({ onAuthOpen, user, onLogout }) => {
  return (
    <nav className="nav">
      <div className="nav__wrapper">
        <figure className="nav__img--mask">
          <Image 
            className="nav__img" 
            src="/assets/logo.png" 
            alt="logo" 
            width={160} 
            height={40} 
            priority
          />
        </figure>
        <ul className="nav__list--wrapper">
          {/* 3. Dynamically swap between Login modal and Logout execution based on auth state */}
          {user ? (
            <li className="nav__list nav__list--login" onClick={onLogout}>
              Logout
            </li>
          ) : (
            <li className="nav__list nav__list--login" onClick={onAuthOpen}>
              Login
            </li>
          )}
          <li className="nav__list nav__list--mobile">About</li>
          <li className="nav__list nav__list--mobile">Contact</li>
          <li className="nav__list nav__list--mobile">Help</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;