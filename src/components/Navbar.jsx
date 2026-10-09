import React, { useEffect, useState } from 'react'

export default function Navbar({ data, onOpenBookModal }) {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = ['hero', 'shloka', 'couple', 'story', 'countdown', 'events', 'gallery', 'venue', 'rsvp']
      const scrollPosition = window.scrollY + 250

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i])
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { id: 'hero', label: 'Invitation' },
    { id: 'couple', label: 'The Couple' },
    { id: 'story', label: 'Our Story' },
    { id: 'countdown', label: 'Countdown' },
    { id: 'events', label: 'Events' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'venue', label: 'Venue' },
    { id: 'rsvp', label: 'RSVP' }
  ]

  const scrollTo = (id) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className={`royal-navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Royal Crest / Monogram */}
        <button
          type="button"
          className="navbar-brand"
          onClick={() => scrollTo('hero')}
          aria-label="Back to top"
        >
          <span className="brand-crest">✦</span>
          <span className="brand-names">
            {data.bride?.name?.split(' ')[0]} <span>&</span> {data.groom?.name?.split(' ')[0]}
          </span>
          <span className="brand-date">{data.wedding?.date ? '15 • 11 • 2025' : ''}</span>
        </button>

        {/* Desktop Links */}
        <nav className="navbar-links" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              className={`nav-link-btn ${activeSection === link.id ? 'active' : ''}`}
              onClick={() => scrollTo(link.id)}
            >
              {link.label}
              {activeSection === link.id && <span className="nav-dot" />}
            </button>
          ))}
        </nav>

        {/* Actions */}
        <div className="navbar-actions">
          {onOpenBookModal && (
            <button
              type="button"
              className="navbar-book-btn"
              onClick={onOpenBookModal}
              title="Open 3D Keepsake Flipbook"
            >
              <span className="book-icon" aria-hidden="true">📖</span>
              <span className="book-text">3D Book Mode</span>
            </button>
          )}

          <button
            type="button"
            className="navbar-rsvp-btn"
            onClick={() => scrollTo('rsvp')}
          >
            RSVP
          </button>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`} />
            <span className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-drawer-content">
          <p className="mobile-drawer-crest">|| शुभ विवाह ||</p>
          <div className="mobile-links-list">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                className={`mobile-nav-item ${activeSection === link.id ? 'active' : ''}`}
                onClick={() => scrollTo(link.id)}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="mobile-drawer-actions">
            {onOpenBookModal && (
              <button
                type="button"
                className="royal-btn-secondary"
                style={{ width: '100%', marginBottom: '12px' }}
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenBookModal()
                }}
              >
                📖 Open 3D Keepsake Book
              </button>
            )}
            <button
              type="button"
              className="royal-btn-primary"
              style={{ width: '100%' }}
              onClick={() => scrollTo('rsvp')}
            >
              RSVP Now
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
