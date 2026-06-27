import React from 'react';
import Image from 'next/image';

const Hero = () => {
  return (
    <section id="hero">
      <div className="hero__container">
        <div className="hero__wrapper">
          <div className="hero__content">
            <h1 className="hero__title">
              Gain more knowledge <br /> in less time
            </h1>
            <p className="hero__subtitle">
              Digesting the world's best books into actionable 15-minute summaries.
            </p>
            <button className="btn hero__btn">Log In / Sign Up</button>
          </div>
          <figure className="hero__img--mask">
            <Image 
              src="/assets/landing.png" 
              alt="Landing Graphic" 
              width={500} 
              height={400}
              priority
            />
          </figure>
        </div>
      </div>
    </section>
  );
};

export default Hero;