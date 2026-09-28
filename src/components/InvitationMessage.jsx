import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingData } from '../data/weddingData';
import './InvitationMessage.css';

gsap.registerPlugin(ScrollTrigger);

export default function InvitationMessage() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

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

  return (
    <section id="invitation-message" className="invitation-message-section" ref={sectionRef}>
      <div className="invitation-container" ref={contentRef}>
        <div className="decorative-border-top"></div>
        
        <h2 className="invitation-heading">{weddingData.invitation.heading}</h2>
        
        <p className="invitation-text">
          {weddingData.invitation.text}
        </p>
        
        <div className="decorative-border-bottom"></div>
      </div>
    </section>
  );
}
