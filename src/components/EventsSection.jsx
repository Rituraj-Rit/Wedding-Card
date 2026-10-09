import React from 'react'

export default function EventsSection({ data }) {
  const events = data.events || []

  const getEventIcon = (name) => {
    const lower = name.toLowerCase()
    if (lower.includes('haldi')) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="12" r="8" fill="#facc15" />
          <path d="M12 2v3m0 14v3M2 12h3m14 0h3m-3.5-6.5l-2.1 2.1m-8.8 8.8l-2.1 2.1m0-13l2.1 2.1m8.8 8.8l2.1 2.1" stroke="#facc15" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    }
    if (lower.includes('mehendi')) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="2">
          <path d="M12 21a9 9 0 0 0 9-9c0-4.97-9-12-9-12s-9 7.03-9 12a9 9 0 0 0 9 9z" />
          <path d="M12 7v8M9 12l6 0" />
        </svg>
      )
    }
    if (lower.includes('sangeet')) {
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" fill="#f472b6" />
        </svg>
      )
    }
    return (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d8b257" strokeWidth="2">
        <circle cx="9" cy="12" r="5" />
        <circle cx="15" cy="12" r="5" />
        <path d="M12 5l1.5 2.5h3L14 9.5l1.5 2.5-3.5-1.5-3.5 1.5 1.5-2.5-2.5-2h3z" fill="#d8b257" />
      </svg>
    )
  }

  return (
    <section id="events" className="events-section">
      <div className="section-container">
        <div className="section-header">
          <p className="section-eyebrow">Auspicious Itinerary</p>
          <h2 className="section-title">
            Wedding <span className="gold-text-gradient">Celebrations</span>
          </h2>
          <div className="ornament-divider">
            <span className="ornament-symbol">✦</span>
          </div>
          <p className="section-description">
            We look forward to celebrating each joyful occasion in your beloved company. Here is our festive itinerary.
          </p>
        </div>

        <div className="events-cards-grid">
          {events.map((event, index) => {
            const mapsUrl =
              data.wedding?.googleMapsUrl ||
              `https://maps.google.com/?q=${encodeURIComponent(event.venue + ' Jaipur')}`

            return (
              <div key={event.id || index} className="event-card royal-glass-card">
                <div className="event-card-top">
                  <div className="event-icon-badge">
                    {getEventIcon(event.name)}
                  </div>
                  <span className="event-tag">{event.tag || 'Wedding Festivity'}</span>
                </div>

                <h3 className="event-title">{event.name}</h3>

                <div className="event-meta-list">
                  <div className="event-meta-row">
                    <span className="meta-icon" aria-hidden="true">🗓</span>
                    <div className="meta-text">
                      <strong className="meta-label">Date</strong>
                      <span className="meta-val">{event.date}</span>
                    </div>
                  </div>

                  <div className="event-meta-row">
                    <span className="meta-icon" aria-hidden="true">⏰</span>
                    <div className="meta-text">
                      <strong className="meta-label">Time</strong>
                      <span className="meta-val">{event.time}</span>
                    </div>
                  </div>

                  <div className="event-meta-row">
                    <span className="meta-icon" aria-hidden="true">📍</span>
                    <div className="meta-text">
                      <strong className="meta-label">Venue</strong>
                      <span className="meta-val">{event.venue}</span>
                    </div>
                  </div>

                  {event.dressCode && (
                    <div className="event-meta-row dress-code-row">
                      <span className="meta-icon" aria-hidden="true">👘</span>
                      <div className="meta-text">
                        <strong className="meta-label">Dress Code</strong>
                        <span className="meta-val dress-val">{event.dressCode}</span>
                      </div>
                    </div>
                  )}
                </div>

                <p className="event-description-text">{event.description}</p>

                <div className="event-card-actions">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="event-directions-link"
                  >
                    <span>View Location &amp; Directions</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
