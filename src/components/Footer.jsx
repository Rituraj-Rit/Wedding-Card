import React from 'react';
import { weddingData } from '../data/weddingData';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <p className="footer-closing">{weddingData.footer.closing}</p>
        
        <p className="footer-main">{weddingData.footer.mainText}</p>
        
        <p className="footer-blessing">{weddingData.footer.blessing}</p>
        
        <div className="footer-divider"></div>
        
        <p className="footer-credit">
          💙 शुभ विवाह 💙
        </p>
      </div>
    </footer>
  );
}
