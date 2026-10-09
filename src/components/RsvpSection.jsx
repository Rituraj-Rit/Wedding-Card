import React, { useEffect, useState } from 'react'

const initialBlessings = [
  {
    name: 'Uncle Rajesh & Auntie Sunita',
    message: 'Wishing both of you endless joy, laughter, and lifelong friendship as you begin this sacred journey together!',
    date: 'Auspicious Wishes'
  },
  {
    name: 'Ananya & Rohan Sharma',
    message: 'May your love grow stronger with each sunrise. Can’t wait to dance our hearts out at the Sangeet!',
    date: 'From the Bride’s Cousins'
  },
  {
    name: 'Vikram & Meera Verma',
    message: 'Heartiest congratulations to the most wonderful couple! Looking forward to celebrating this royal union in Jaipur.',
    date: 'Warm Regards'
  }
]

export default function RsvpSection({ data }) {
  const [formData, setFormData] = useState({
    name: '',
    attendance: 'attending',
    guestCount: '2',
    events: ['wedding'],
    blessing: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [blessings, setBlessings] = useState(initialBlessings)

  useEffect(() => {
    try {
      const stored = localStorage.getItem('wedding_guest_blessings')
      if (stored) {
        const parsed = JSON.parse(stored)
        if (Array.isArray(parsed) && parsed.length > 0) {
          setBlessings([...parsed, ...initialBlessings])
        }
      }
    } catch {}
  }, [])

  const handleCheckboxChange = (eventName) => {
    setFormData((prev) => {
      const exists = prev.events.includes(eventName)
      return {
        ...prev,
        events: exists
          ? prev.events.filter((e) => e !== eventName)
          : [...prev.events, eventName]
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    const newBlessing = {
      name: formData.name,
      message: formData.blessing || 'Wishing the bride and groom a lifetime filled with unconditional love, health, and happiness!',
      date: 'Just now'
    }

    const updated = [newBlessing, ...blessings]
    setBlessings(updated)
    try {
      localStorage.setItem('wedding_guest_blessings', JSON.stringify([newBlessing]))
    } catch {}

    setSubmitted(true)
  }

  return (
    <section id="rsvp" className="rsvp-section">
      <div className="section-container">
        <div className="section-header">
          <p className="section-eyebrow">Your Gracious Presence</p>
          <h2 className="section-title">
            RSVP &amp; <span className="gold-text-gradient">Guest Blessings</span>
          </h2>
          <div className="ornament-divider">
            <span className="ornament-symbol">✦</span>
          </div>
          <p className="section-description">
            Your presence and prayers are our greatest blessings. Kindly grace us with your response by 1st November 2025.
          </p>
        </div>

        <div className="rsvp-content-grid">
          {/* Form Card */}
          <div className="rsvp-form-card royal-glass-card">
            {submitted ? (
              <div className="rsvp-success-view">
                <div className="success-icon-badge">✦</div>
                <h3 className="success-title">Thank You, {formData.name}!</h3>
                <p className="success-message">
                  {formData.attendance === 'attending'
                    ? 'Your RSVP has been joyfully received! We cannot wait to celebrate this auspicious union in your warm company.'
                    : 'We will dearly miss your physical presence, but your warm blessings remain forever close to our hearts.'}
                </p>
                <button
                  type="button"
                  className="royal-btn-secondary"
                  onClick={() => setSubmitted(false)}
                >
                  Update Response
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="rsvp-form">
                {/* Guest Name */}
                <div className="form-group">
                  <label htmlFor="guest-name" className="form-label">
                    Full Name(s) *
                  </label>
                  <input
                    id="guest-name"
                    type="text"
                    required
                    placeholder="e.g. Mr. &amp; Mrs. Sharma"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                {/* Attendance Radio */}
                <div className="form-group">
                  <span className="form-label">Will you be attending? *</span>
                  <div className="attendance-radio-group">
                    <label className={`radio-pill ${formData.attendance === 'attending' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="attendance"
                        value="attending"
                        checked={formData.attendance === 'attending'}
                        onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                      />
                      <span>Joyfully Accept</span>
                    </label>

                    <label className={`radio-pill ${formData.attendance === 'declining' ? 'selected' : ''}`}>
                      <input
                        type="radio"
                        name="attendance"
                        value="declining"
                        checked={formData.attendance === 'declining'}
                        onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                      />
                      <span>Regretfully Decline</span>
                    </label>
                  </div>
                </div>

                {formData.attendance === 'attending' && (
                  <>
                    {/* Guest Count */}
                    <div className="form-group">
                      <label htmlFor="guest-count" className="form-label">
                        Number of Attending Guests
                      </label>
                      <select
                        id="guest-count"
                        className="form-select"
                        value={formData.guestCount}
                        onChange={(e) => setFormData({ ...formData, guestCount: e.target.value })}
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                        <option value="5+">5+ Guests (Family)</option>
                      </select>
                    </div>

                    {/* Events Attending */}
                    <div className="form-group">
                      <span className="form-label">Events You Plan to Attend</span>
                      <div className="events-checkbox-grid">
                        {[
                          { id: 'haldi', label: 'Haldi Ceremony' },
                          { id: 'mehendi', label: 'Mehendi Soirée' },
                          { id: 'sangeet', label: 'Sangeet Night' },
                          { id: 'wedding', label: 'Wedding Ceremony' }
                        ].map((evt) => (
                          <label key={evt.id} className="checkbox-item">
                            <input
                              type="checkbox"
                              checked={formData.events.includes(evt.id)}
                              onChange={() => handleCheckboxChange(evt.id)}
                            />
                            <span>{evt.label}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {/* Blessing Message */}
                <div className="form-group">
                  <label htmlFor="guest-blessing" className="form-label">
                    A Blessing or Message for the Couple
                  </label>
                  <textarea
                    id="guest-blessing"
                    rows="3"
                    placeholder="Write your loving blessings, wishes, or memories here..."
                    className="form-textarea"
                    value={formData.blessing}
                    onChange={(e) => setFormData({ ...formData, blessing: e.target.value })}
                  />
                </div>

                <button type="submit" className="royal-btn-primary" style={{ width: '100%', marginTop: '10px' }}>
                  <span>Submit Auspicious RSVP</span>
                  <span aria-hidden="true">✦</span>
                </button>
              </form>
            )}
          </div>

          {/* Live Blessings Wall */}
          <div className="blessings-wall-card royal-glass-card">
            <div className="wall-header">
              <span className="wall-icon">💌</span>
              <h3 className="wall-title">Guest Blessings Wall</h3>
              <p className="wall-subtitle">Heartfelt prayers and messages from loved ones</p>
            </div>

            <div className="blessings-scroll-list">
              {blessings.map((item, idx) => (
                <div key={idx} className="blessing-item">
                  <div className="blessing-meta">
                    <strong className="blessing-author">{item.name}</strong>
                    <span className="blessing-tag">{item.date}</span>
                  </div>
                  <p className="blessing-message">“{item.message}”</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
