import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingData } from '../data/weddingData';
import './FamilySection.css';

gsap.registerPlugin(ScrollTrigger);

export default function FamilySection() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const names = contentRef.current.querySelectorAll('.family-name');
      
      gsap.from(names, {
        opacity: 0,
        y: 10,
        duration: 0.5,
        stagger: 0.06,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true
        },
        ease: 'power2.out'
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="family" className="family-section" ref={sectionRef}>
      <div className="family-container">
        <h2 className="section-title">{weddingData.family.heading}</h2>
        
        <div className="family-content" ref={contentRef}>
          <div className="family-names">
            {weddingData.family.names.map((name, index) => (
              <span key={index} className="family-name">
                {name}
              </span>
            ))}
          </div>
          
          <p className="family-suffix">{weddingData.family.suffix}</p>
        </div>
      </div>
    </section>
  );
}
