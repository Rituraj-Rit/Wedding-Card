import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { weddingData } from '../data/weddingData';
import './EventsTimeline.css';

gsap.registerPlugin(ScrollTrigger);

export default function EventsTimeline() {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !timelineRef.current) return;

    const ctx = gsap.context(() => {
      const events = timelineRef.current.querySelectorAll('.event-item');
      
      gsap.from(events, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.12,
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
    <section id="events" className="events-section" ref={sectionRef}>
      <div className="events-container">
        <h2 className="section-title">कार्यक्रम</h2>
        
        <div className="timeline" ref={timelineRef}>
          {weddingData.events.map((event, index) => (
            <div key={event.id} className="event-item">
              <div className="event-marker"></div>
              <div className="event-content">
                <h3 className="event-title">{event.title}</h3>
                <p className="event-date">{event.date}</p>
                <p className="event-day">{event.day}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
