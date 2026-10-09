import React, { useEffect, useState } from 'react'

export default function CountdownSection({ data }) {
  const wedding = data.wedding || {}
  const targetDate = new Date(wedding.targetDateISO || '2025-11-15T18:30:00+05:30').getTime()

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isCompleted: false
  })
  const [copiedLink, setCopiedLink] = useState(false)

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime()
      const difference = targetDate - now

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isCompleted: true })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds, isCompleted: false })
    }

    calculateTime()
    const interval = setInterval(calculateTime, 1000)
    return () => clearInterval(interval)
  }, [targetDate])

  const createGoogleCalendarLink = () => {
    const title = encodeURIComponent(`Wedding: ${data.bride?.name} & ${data.groom?.name}`)
    const details = encodeURIComponent(
      `You are cordially invited to celebrate the wedding union of ${data.bride?.name} and ${data.groom?.name}.\nVenue: ${wedding.venue}\nAddress: ${wedding.address}`
    )
    const location = encodeURIComponent(`${wedding.venue}, ${wedding.address}`)
    // Format: YYYYMMDDTHHmmssZ
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20251115T130000Z/20251115T183000Z&details=${details}&location=${location}`
  }

  const downloadIcsFile = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Royal Wedding Invitation//EN',
      'BEGIN:VEVENT',
      'SUMMARY:Wedding: ' + (data.bride?.name || 'Bride') + ' & ' + (data.groom?.name || 'Groom'),
      'DESCRIPTION:You are cordially invited to celebrate the royal wedding of ' +
        (data.bride?.name || 'Bride') +
        ' and ' +
        (data.groom?.name || 'Groom'),
      'LOCATION:' + (wedding.venue || 'Jaipur') + ', ' + (wedding.address || ''),
      'DTSTART:20251115T130000Z',
      'DTEND:20251115T183000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n')

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
    const link = document.createElement('a')
    link.href = window.URL.createObjectURL(blob)
    link.setAttribute('download', 'Wedding-Invitation.ics')
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `Wedding Invitation — ${data.bride?.name} & ${data.groom?.name}`,
        text: `Join us in celebrating the royal wedding of ${data.bride?.name} and ${data.groom?.name}!`,
        url: window.location.href
      }).catch(() => {})
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopiedLink(true)
      setTimeout(() => setCopiedLink(false), 2500)
    }
  }

  return (
    <section id="countdown" className="countdown-section">
      <div className="section-container">
        <div className="section-header">
          <p className="section-eyebrow">The Auspicious Countdown</p>
          <h2 className="section-title">
            Until We Say <span className="gold-text-gradient">“I Do”</span>
          </h2>
          <div className="ornament-divider">
            <span className="ornament-symbol">✦</span>
          </div>
          <p className="section-description">
            {wedding.date} • {wedding.venue}, Jaipur
          </p>
        </div>

        {/* 4 Gold Chrono Units */}
        <div className="chrono-grid">
          <div className="chrono-card royal-glass-card">
            <span className="chrono-number">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="chrono-label">Days</span>
          </div>

          <div className="chrono-card royal-glass-card">
            <span className="chrono-number">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="chrono-label">Hours</span>
          </div>

          <div className="chrono-card royal-glass-card">
            <span className="chrono-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="chrono-label">Minutes</span>
          </div>

          <div className="chrono-card royal-glass-card">
            <span className="chrono-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="chrono-label">Seconds</span>
          </div>
        </div>

        {/* Calendar Action Buttons */}
        <div className="countdown-actions">
          <a
            href={createGoogleCalendarLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="royal-btn-primary"
          >
            <span aria-hidden="true">📅</span> Add to Google Calendar
          </a>

          <button
            type="button"
            className="royal-btn-secondary"
            onClick={downloadIcsFile}
          >
            <span aria-hidden="true"></span> Apple Calendar (.ics)
          </button>

          <button
            type="button"
            className="royal-btn-secondary"
            onClick={handleShare}
          >
            <span aria-hidden="true">↗</span> {copiedLink ? 'Link Copied!' : 'Share Invitation'}
          </button>
        </div>
      </div>
    </section>
  )
}
