import React from 'react'

function formatList(list) {
  return Array.isArray(list) ? list.filter(Boolean) : []
}

export default function WeddingPage({ pageType, data }) {
  const brideName = data?.bride?.name || 'Bride Name'
  const groomName = data?.groom?.name || 'Groom Name'
  const wedding = data?.wedding || {}
  const family = data?.family || {}
  const invitation = data?.invitation || {}
  const message = data?.message || {}

  const renderPage = () => {
    switch (pageType) {
      case 'invitation':
        return (
          <div className="page-content invitation-content">
            <p className="section-label">With the blessings of our beloved family</p>
            <h2>We invite you to celebrate the beginning of a beautiful new journey.</h2>
            <div className="names-block">
              <span>{brideName}</span>
              <span className="ampersand">&</span>
              <span>{groomName}</span>
            </div>
            <p>
              Request the pleasure of your gracious presence and blessings on the auspicious occasion of their wedding.
            </p>
          </div>
        )

      case 'events':
        return (
          <div className="page-content events-content">
            <p className="section-label">Wedding Festivities</p>
            <div className="event-grid">
              {(data?.events || []).map((event) => (
                <article className="event-card" key={event.name || event.title || event.id || event.eventName}>
                  <div className="event-icon">✦</div>
                  <h3>{event.name || event.title || 'Event'}</h3>
                  {event.date ? <p><strong>Date:</strong> {event.date}</p> : null}
                  {event.time ? <p><strong>Time:</strong> {event.time}</p> : null}
                  {event.venue ? <p><strong>Venue:</strong> {event.venue}</p> : null}
                  {event.description ? <p className="event-description">{event.description}</p> : null}
                </article>
              ))}
            </div>
          </div>
        )

      case 'ceremony':
        return (
          <div className="page-content ceremony-content">
            <p className="section-label">Wedding Ceremony</p>
            <h2>
              {brideName}
              <span className="ampersand">&</span>
              {groomName}
            </h2>
            <div className="ceremony-meta">
              {wedding.date ? <p><strong>Date:</strong> {wedding.date}</p> : null}
              {wedding.time ? <p><strong>Time:</strong> {wedding.time}</p> : null}
              {wedding.venue ? <p><strong>Venue:</strong> {wedding.venue}</p> : null}
            </div>
          </div>
        )

      case 'family':
        return (
          <div className="page-content family-content">
            <p className="section-label">With the blessings of</p>
            <div className="family-layout">
              <div className="family-column">
                <h3>Bride&apos;s Family</h3>
                <ul>
                  {formatList(family.brideParents).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="family-divider" aria-hidden="true">✦</div>
              <div className="family-column">
                <h3>Groom&apos;s Family</h3>
                <ul>
                  {formatList(family.groomParents).map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )

      case 'venue':
        return (
          <div className="page-content venue-content">
            <p className="section-label">Venue</p>
            <h2>{wedding.venue || 'Venue Name'}</h2>
            <p className="venue-address">{wedding.address || 'Full address of the venue'}</p>
            {wedding.googleMapsUrl ? (
              <a className="map-link" href={wedding.googleMapsUrl} target="_blank" rel="noreferrer">
                View Location
              </a>
            ) : null}
          </div>
        )

      case 'message':
        return (
          <div className="page-content message-content">
            <p className="section-label">Two hearts,</p>
            <h2>one beautiful journey, and a lifetime of togetherness.</h2>
            <p className="message-couple">
              {brideName} ❤️ {groomName}
            </p>
          </div>
        )

      case 'final':
        return (
          <div className="page-content final-content">
            <p className="final-quote">Your presence is the greatest gift.</p>
            <p>Thank you for being a part of our special day.</p>
            <div className="final-couple">
              {brideName}
              <span>&</span>
              {groomName}
            </div>
            <p className="with-love">With Love</p>
          </div>
        )

      default:
        return (
          <div className="page-content cover-content">
            <p className="eyebrow">शुभ विवाह</p>
            <h1>{brideName}<span className="cover-and">&</span>{groomName}</h1>
          </div>
        )
    }
  }

  return <div className={`wedding-page ${pageType}-page`}>{renderPage()}</div>
}
