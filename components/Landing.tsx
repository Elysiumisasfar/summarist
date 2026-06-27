"use client";
import React from "react";
import Image from "next/image";
import { User } from "firebase/auth";

// 1. Define the props structure
interface LandingProps {
  onAuthOpen: () => void;
  user: User | null;
}

// 2. Pass the props into the component function
const Landing: React.FC<LandingProps> = ({ onAuthOpen, user }) => {
  return (
    <section id="landing">
      <div className="container">
        <div className="row">
          <div className="landing__wrapper">
            <div className="landing__content">
              <div className="landing__content__title">
                Gain more knowledge <br className="remove--tablet" />
                in less time
              </div>
              <div className="landing__content__subtitle">
                Great summaries for busy people,
                <br className="remove--tablet" />
                individuals who barely have time to read,
                <br className="remove--tablet" />
                and even people who don’t like to read.
              </div>
              {/* 3. Open modal if clicked, or customize behavior if already logged in */}
              <button className="btn home__cta--btn" onClick={onAuthOpen}>
                {user ? "Go to Dashboard" : "Login"}
              </button>
            </div>
            <figure className="landing__image--mask">
              <Image 
                src="/assets/landing.png" 
                alt="landing" 
                width={540} 
                height={420} 
                priority
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;