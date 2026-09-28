import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingData } from '../data/weddingData';
import './Contact.css';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      const items = contentRef.current.querySelectorAll('.contact-item');
      
      // Filter out null or empty items
      const validItems = Array.from(items).filter(item => item && item.textContent?.trim());
      
      if (validItems.length > 0) {
        gsap.from(validItems, {
          opacity: 0,
          y: 20,
          duration: 0.6,
          stagger: 0.1,
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

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'शुभ विवाह',
          text: 'आप को शुभ विवाह के समारोह के लिए आमंत्रित करते हैं',
          url: window.location.href
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('आमंत्रण लिंक कॉपी किया गया!');
    }
  };

  return (
    <section id="contact" className="contact-section" ref={sectionRef}>
      <div className="contact-container">
        <h2 className="section-title">{weddingData.contact.heading}</h2>
        
        <div className="contact-content" ref={contentRef}>
          <div className="contact-item phone-card">
            <a href={`tel:${weddingData.contact.phone1}`} className="phone-button">
              📱 {weddingData.contact.phone1}
            </a>
          </div>
          
          <div className="contact-item phone-card">
            <a href={`tel:${weddingData.contact.phone2}`} className="phone-button">
              📱 {weddingData.contact.phone2}
            </a>
          </div>
          
          <div className="contact-item">
            <button className="share-button" onClick={handleShare}>
              💌 आमंत्रण साझा करें
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
