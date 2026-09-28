import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingData } from '../data/weddingData';
import './Introduction.css';

gsap.registerPlugin(ScrollTrigger);

export default function Introduction() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
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

      gsap.from(textRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
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

  return (
    <section id="introduction" className="introduction-section" ref={sectionRef}>
      <div className="introduction-container">
        <div className="decorative-top">॥</div>
        
        <h2 className="section-title" ref={titleRef}>
          {weddingData.introduction.title}
        </h2>
        
        <p className="introduction-text" ref={textRef}>
          {weddingData.introduction.text}
        </p>
        
        <div className="decorative-bottom">॥</div>
      </div>
    </section>
  );
}
