import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { weddingData } from '../data/weddingData';
import './Hero.css';

export default function Hero() {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const mantraRef = useRef(null);
  const titleRef = useRef(null);
  const photoRef = useRef(null);
  const namesRef = useRef(null);
  const dateRef = useRef(null);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    if (!contentRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      // Animate mantra
      tl.from(mantraRef.current, {
        opacity: 0,
        y: -30,
        duration: 0.8,
        ease: 'power3.out'
      }, 0);
      
      // Animate title
      tl.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 0.9,
        ease: 'power3.out'
      }, 0.1);
      
      // Animate photo
      tl.from(photoRef.current, {
        opacity: 0,
        scale: 0.92,
        duration: 1,
        ease: 'power3.out'
      }, 0.2);
      
      // Animate names
      tl.from(namesRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power2.out'
      }, 0.4);
      
      // Animate date
      tl.from(dateRef.current, {
        opacity: 0,
        y: 15,
        duration: 0.6,
        ease: 'power2.out'
      }, 0.5);
      
      // Animate button
      tl.from(buttonRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: 'power2.out'
      }, 0.6);
    }, contentRef);

    return () => ctx.revert();
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('introduction');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero-background"></div>
      
      <div className="hero-content" ref={contentRef}>
        <div className="mantra" ref={mantraRef}>{weddingData.heroMantra}</div>
        
        <h1 className="hero-title" ref={titleRef}>{weddingData.heroTitle}</h1>
        
        <div className="couple-photo-container" ref={photoRef}>
          <div className="couple-photo-frame">
            <img 
              src={weddingData.heroImage} 
              alt="Couple" 
              className="couple-photo"
              loading="eager"
            />
          </div>
        </div>
        
        <div className="couple-names" ref={namesRef}>
          {weddingData.heroSubtitle}
        </div>
        
        <div className="wedding-date" ref={dateRef}>
          {weddingData.weddingDateDisplay}
        </div>
        
        <button className="cta-button" ref={buttonRef} onClick={scrollToNext}>
          आमंत्रण देखें ↓
        </button>
      </div>
    </section>
  );
}
