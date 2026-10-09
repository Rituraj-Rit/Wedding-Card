import React, { useState } from 'react'

export default function VenueSection({ data }) {
  const wedding = data.wedding || {}
  const [copied, setCopied] = useState(false)

  const copyAddress = () => {
    const fullText = `${wedding.venue}, ${wedding.address}`
    navigator.clipboard.writeText(fullText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section id="venue" className="venue-section">
      <div className="section-container">
        <div className="section-header">
          <p className="section-eyebrow">The Sacred Destination</p>
          <h2 className="section-title">
            The Royal <span className="gold-text-gradient">Venue &amp; Location</span>
          </h2>
          <div className="ornament-divider">
            <span className="ornament-symbol">✦</span>
          </div>
          <p className="section-description">
            Join us under the starlit skies of the Pink City as we exchange sacred vows in an atmosphere of royal heritage and romance.
          </p>
        </div>

        <div className="venue-content-grid">
          {/* Visual Showcase Card */}
          <div className="venue-visual-card royal-glass-card">
            <div className="venue-image-wrapper">
              <img
                src="/images/mandap.jpg"
                alt={wedding.venue}
                className="venue-showcase-img"
                loading="lazy"
                decoding="async"
              />
              <div className="venue-badge">Ceremonial Palace Mandap</div>
            </div>
            <div className="venue-visual-info">
              <h3 className="venue-name">{wedding.venue}</h3>
              <p className="venue-city">Jaipur, Rajasthan, India</p>
            </div>
          </div>

          {/* Details & Concierge Card */}
          <div className="venue-details-card royal-glass-card">
            <div className="details-header">
              <span className="details-kicker">Guest Concierge &amp; Map</span>
              <h4 className="details-title">Plan Your Auspicious Visit</h4>
            </div>

            <div className="venue-info-blocks">
              <div className="info-block">
                <span className="info-icon" aria-hidden="true">🏛</span>
                <div className="info-text">
                  <strong>Palace Hall</strong>
                  <span>{wedding.venue}</span>
                </div>
              </div>

              <div className="info-block">
                <span className="info-icon" aria-hidden="true">📍</span>
                <div className="info-text">
                  <strong>Full Address</strong>
                  <span>{wedding.address}</span>
                </div>
              </div>

              <div className="info-block">
                <span className="info-icon" aria-hidden="true">⏰</span>
                <div className="info-text">
                  <strong>Ceremony Timings</strong>
                  <span>{wedding.time} (Guest reception begins 6:00 PM)</span>
                </div>
              </div>

              <div className="info-block">
                <span className="info-icon" aria-hidden="true">🚗</span>
                <div className="info-text">
                  <strong>Guest Amenities</strong>
                  <span>Dedicated Valet Parking &amp; Hospitality Lounge</span>
                </div>
              </div>
            </div>

            <div className="venue-actions">
              <a
                href={wedding.googleMapsUrl || `https://maps.google.com/?q=${encodeURIComponent(wedding.venue + ' ' + wedding.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="royal-btn-primary"
              >
                <span>Open in Google Maps</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" />
                </svg>
              </a>

              <button
                type="button"
                className="royal-btn-secondary"
                onClick={copyAddress}
              >
                <span>{copied ? '✓ Address Copied!' : 'Copy Venue Address'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
