import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useCountdown } from '../hooks/useCountdown';
import { weddingData } from '../data/weddingData';
import './Countdown.css';

gsap.registerPlugin(ScrollTrigger);

export default function Countdown() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const countdown = useCountdown(weddingData.weddingDate);

  useLayoutEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true
        },
        ease: 'power3.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const pad = (num) => String(num).padStart(2, '0');

  return (
    <section id="countdown" className="countdown-section" ref={sectionRef}>
      <div className="countdown-container" ref={contentRef}>
        <h2 className="section-title">{weddingData.countdown.heading}</h2>
        
        <div className="countdown-grid">
          <div className="countdown-item">
            <div className="countdown-value">{pad(countdown.days)}</div>
            <div className="countdown-label">दिन</div>
          </div>
          
          <div className="countdown-item">
            <div className="countdown-value">{pad(countdown.hours)}</div>
            <div className="countdown-label">घंटा</div>
          </div>
          
          <div className="countdown-item">
            <div className="countdown-value">{pad(countdown.minutes)}</div>
            <div className="countdown-label">मिनट</div>
          </div>
          
          <div className="countdown-item">
            <div className="countdown-value">{pad(countdown.seconds)}</div>
            <div className="countdown-label">सेकंड</div>
          </div>
        </div>
      </div>
    </section>
  );
}
