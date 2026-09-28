import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingData } from '../data/weddingData';
import './VenueSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function VenueSection() {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true
        },
        ease: 'power3.out'
      });

      if (buttonRef.current) {
        gsap.from(buttonRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.8,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true
          },
          ease: 'power2.out'
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMapClick = () => {
    window.open(weddingData.venue.googleMapsUrl, '_blank');
  };

  return (
    <section id="venue" className="venue-section" ref={sectionRef}>
      <div className="venue-container">
        <h2 className="section-title">{weddingData.venue.heading}</h2>
        
        <div className="venue-card" ref={cardRef}>
          <p className="venue-description">{weddingData.venue.description}</p>
          
          <div className="venue-details">
            <p><strong>गाँव:</strong> {weddingData.venue.village}</p>
            <p><strong>पोस्ट:</strong> {weddingData.venue.post}</p>
            <p><strong>जिला:</strong> {weddingData.venue.district}</p>
          </div>
          
          <button 
            className="venue-button" 
            onClick={handleMapClick}
            ref={buttonRef}
          >
            📍 विवाह स्थल देखें
          </button>
        </div>
      </div>
    </section>
  );
}
