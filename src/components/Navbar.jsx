import React, { useState, useEffect } from 'react';
import { gsap } from 'gsap';
import './Navbar.css';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">शुभ विवाह</div>
        
        <button 
          className={`hamburger ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${menuOpen ? 'active' : ''}`}>
          <li><button onClick={() => scrollToSection('hero')}>होम</button></li>
          <li><button onClick={() => scrollToSection('introduction')}>परिचय</button></li>
          <li><button onClick={() => scrollToSection('couple')}>वर-वधू</button></li>
          <li><button onClick={() => scrollToSection('events')}>कार्यक्रम</button></li>
          <li><button onClick={() => scrollToSection('family')}>परिवार</button></li>
          <li><button onClick={() => scrollToSection('venue')}>स्थल</button></li>
          <li><button onClick={() => scrollToSection('gallery')}>गैलरी</button></li>
          <li><button onClick={() => scrollToSection('contact')}>संपर्क</button></li>
        </ul>
      </div>
    </nav>
  );
}
