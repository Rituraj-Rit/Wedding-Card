import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingData } from '../data/weddingData';
import './CoupleSection.css';

gsap.registerPlugin(ScrollTrigger);

export default function CoupleSection() {
  const sectionRef = useRef(null);
  const groomCardRef = useRef(null);
  const brideCardRef = useRef(null);
  const centerRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Groom card slides from left
      gsap.from(groomCardRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true
        },
        ease: 'power3.out'
      });

      // Bride card slides from right
      gsap.from(brideCardRef.current, {
        opacity: 0,
        x: 50,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true
        },
        ease: 'power3.out'
      });

      // Center heart scales
      gsap.from(centerRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true
        },
        ease: 'back.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="couple" className="couple-section" ref={sectionRef}>
      <div className="couple-container">
        {/* Groom Card */}
        <div className="couple-card groom-card" ref={groomCardRef}>
          <div className="card-title">{weddingData.groom.title}</div>
          <div className="card-image">
            <img src={weddingData.groom.image} alt={weddingData.groom.name} />
          </div>
          <h3 className="card-name">{weddingData.groom.name}</h3>
          <p className="card-father">{weddingData.groom.father}</p>
          <p className="card-address">{weddingData.groom.address}</p>
        </div>

        {/* Center Heart */}
        <div className="center-divider" ref={centerRef}>
          <div className="center-emoji">{weddingData.coupleSection.centerEmoji}</div>
          <div className="center-text">{weddingData.coupleSection.centerText}</div>
        </div>

        {/* Bride Card */}
        <div className="couple-card bride-card" ref={brideCardRef}>
          <div className="card-title">{weddingData.bride.title}</div>
          <div className="card-image">
            <img src={weddingData.bride.image} alt={weddingData.bride.name} />
          </div>
          <h3 className="card-name">{weddingData.bride.name}</h3>
          <p className="card-father">{weddingData.bride.father}</p>
          <p className="card-address">{weddingData.bride.address}</p>
        </div>
      </div>
    </section>
  );
}
