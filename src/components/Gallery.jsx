import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingData } from '../data/weddingData';
import './Gallery.css';

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const sectionRef = useRef(null);
  const galleryRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !galleryRef.current) return;

    const ctx = gsap.context(() => {
      const images = galleryRef.current.querySelectorAll('.gallery-item');
      
      gsap.from(images, {
        opacity: 0,
        scale: 0.92,
        duration: 0.8,
        stagger: 0.12,
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
    <section id="gallery" className="gallery-section" ref={sectionRef}>
      <div className="gallery-container">
        <h2 className="section-title">गैलरी</h2>
        
        <div className="gallery-grid" ref={galleryRef}>
          {weddingData.gallery.map((item) => (
            <div key={item.id} className="gallery-item">
              <img 
                src={item.image} 
                alt={item.alt}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
