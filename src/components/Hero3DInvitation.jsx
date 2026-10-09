import React, { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Hero3DInvitation({ data, onOpenBookModal }) {
  const [isOpen, setIsOpen] = useState(false)
  const cardShellRef = useRef(null)
  const cardRef = useRef(null)
  const shineRef = useRef(null)
  const leftFlapRef = useRef(null)
  const rightFlapRef = useRef(null)
  const innerCardRef = useRef(null)

  // 3D Mouse Parallax and Tilt
  useEffect(() => {
    const cardShell = cardShellRef.current
    const card = cardRef.current
    const shine = shineRef.current
    if (!cardShell || !card) return

    const handleMouseMove = (e) => {
      const rect = cardShell.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = ((y - centerY) / centerY) * -12
      const rotateY = ((x - centerX) / centerX) * 14

      gsap.to(card, {
        rotateX,
        rotateY,
        duration: 0.4,
        ease: 'power2.out',
        transformPerspective: 1800,
        overwrite: 'auto'
      })

      if (shine) {
        const shineX = (x / rect.width) * 100
        const shineY = (y / rect.height) * 100
        shine.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255, 238, 194, 0.35) 0%, transparent 60%)`
      }
    }

    const handleMouseLeave = () => {
      gsap.to(card, {
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: 'power3.out',
        overwrite: 'auto'
      })
      if (shine) {
        shine.style.background = 'radial-gradient(circle at 50% 50%, rgba(255, 238, 194, 0.15) 0%, transparent 60%)'
      }
    }

    cardShell.addEventListener('mousemove', handleMouseMove)
    cardShell.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cardShell.removeEventListener('mousemove', handleMouseMove)
      cardShell.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  const toggleOpen = () => {
    const nextState = !isOpen
    setIsOpen(nextState)

    const left = leftFlapRef.current
    const right = rightFlapRef.current
    const inner = innerCardRef.current

    if (nextState) {
      // Unfold animation
      gsap.timeline()
        .to(left, { rotateY: -140, duration: 1.1, ease: 'power3.inOut' }, 0)
        .to(right, { rotateY: 140, duration: 1.1, ease: 'power3.inOut' }, 0)
        .fromTo(
          inner,
          { z: 0, scale: 0.95, opacity: 0.7 },
          { z: 30, scale: 1, opacity: 1, duration: 1.1, ease: 'power2.out' },
          0.3
        )
    } else {
      // Fold close animation
      gsap.timeline()
        .to(inner, { z: 0, scale: 0.95, duration: 0.8, ease: 'power2.in' }, 0)
        .to(left, { rotateY: 0, duration: 1.1, ease: 'power3.inOut' }, 0.2)
        .to(right, { rotateY: 0, duration: 1.1, ease: 'power3.inOut' }, 0.2)
    }
  }

  const scrollToNext = () => {
    const el = document.getElementById('shloka') || document.getElementById('couple')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="royal-hero-section">
      {/* Top Auspicious Header Text */}
      <div className="hero-header-banner">
        <p className="hero-shloka-header">॥ श्री गणेशाय नमः ॥</p>
        <span className="hero-header-ornament" aria-hidden="true">✦ ✤ ✦</span>
        <p className="hero-subheading">
          {data.invitation?.subheading || 'With the divine blessings of Almighty and our beloved ancestors'}
        </p>
      </div>

      {/* 3D Invitation Card Stage */}
      <div className="hero-3d-stage" ref={cardShellRef}>
        <div
          ref={cardRef}
          className={`royal-invitation-card-3d ${isOpen ? 'is-opened' : ''}`}
          onClick={toggleOpen}
          role="button"
          tabIndex={0}
          aria-label={isOpen ? 'Click to close invitation' : 'Click to open wedding invitation'}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              toggleOpen()
            }
          }}
        >
          {/* Specular Light Reflection Overlay */}
          <div ref={shineRef} className="card-specular-shine" aria-hidden="true" />

          {/* Left Flap */}
          <div ref={leftFlapRef} className="card-flap flap-left">
            <div className="flap-outer flap-outer-left">
              <div className="flap-corner-filigree top-left" />
              <div className="flap-corner-filigree bottom-left" />
              <div className="flap-content">
                <span className="flap-emblem">ॐ</span>
                <p className="flap-hindi">मांगल्यं</p>
              </div>
            </div>
          </div>

          {/* Right Flap */}
          <div ref={rightFlapRef} className="card-flap flap-right">
            <div className="flap-outer flap-outer-right">
              <div className="flap-corner-filigree top-right" />
              <div className="flap-corner-filigree bottom-right" />
              <div className="flap-content">
                <span className="flap-emblem">卐</span>
                <p className="flap-hindi">विवाह</p>
              </div>
            </div>
          </div>

          {/* Center Wax Seal (disappears / fades when unfolded) */}
          <div className={`card-royal-wax-seal ${isOpen ? 'broken' : ''}`} aria-hidden="true">
            <div className="seal-outer-rim">
              <div className="seal-inner-emboss">
                <span className="seal-monogram">✦</span>
              </div>
            </div>
            <span className="seal-ribbon ribbon-left" />
            <span className="seal-ribbon ribbon-right" />
          </div>

          {/* Inner Reveal Invitation Body */}
          <div ref={innerCardRef} className="card-inner-invitation">
            <div className="inner-card-frame">
              {/* Corner Gold Ornaments */}
              <div className="inner-corner-ornament top-left" />
              <div className="inner-corner-ornament top-right" />
              <div className="inner-corner-ornament bottom-left" />
              <div className="inner-corner-ornament bottom-right" />

              <div className="inner-card-body">
                <div className="inner-crest-badge">
                  <span className="inner-ganesha-icon">॥ शुभ विवाह ॥</span>
                </div>

                <p className="inner-invite-intro">
                  {data.invitation?.heading || 'Together with their families'}
                </p>

                {/* Grand Calligraphy Couple Names */}
                <h1 className="inner-couple-names">
                  <span className="name-bride">{data.bride?.name}</span>
                  <span className="names-conjunction">&amp;</span>
                  <span className="name-groom">{data.groom?.name}</span>
                </h1>

                <div className="inner-divider">
                  <span className="divider-line" />
                  <span className="divider-star">✦</span>
                  <span className="divider-line" />
                </div>

                <p className="inner-invite-text">
                  {data.invitation?.text || 'Request the honor of your presence and blessings as they unite in holy matrimony'}
                </p>

                {/* Wedding Key Details */}
                <div className="inner-details-grid">
                  <div className="inner-detail-item">
                    <span className="detail-label">The Auspicious Day</span>
                    <span className="detail-value">{data.wedding?.date}</span>
                  </div>
                  <div className="inner-detail-item">
                    <span className="detail-label">Auspicious Muhurat</span>
                    <span className="detail-value">{data.wedding?.time}</span>
                  </div>
                  <div className="inner-detail-item full-width">
                    <span className="detail-label">The Royal Venue</span>
                    <span className="detail-value">{data.wedding?.venue}</span>
                    <span className="detail-subvalue">{data.wedding?.address}</span>
                  </div>
                </div>

                {/* Card CTA inside */}
                <div className="inner-card-actions" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    className="royal-btn-primary"
                    onClick={scrollToNext}
                  >
                    Celebrate With Us ↓
                  </button>
                  {onOpenBookModal && (
                    <button
                      type="button"
                      className="royal-btn-secondary"
                      onClick={onOpenBookModal}
                    >
                      📖 3D Keepsake Book
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Call to Action and Hint */}
      <div className="hero-bottom-controls">
        <button
          type="button"
          className="hero-open-toggle-btn"
          onClick={toggleOpen}
        >
          <span className="toggle-sparkle">✦</span>
          {isOpen ? 'Fold Invitation' : 'Touch to Unfold Invitation'}
          <span className="toggle-sparkle">✦</span>
        </button>

        <button
          type="button"
          className="hero-scroll-indicator"
          onClick={scrollToNext}
          aria-label="Scroll to wedding details"
        >
          <span className="scroll-text">Explore Royal Celebrations</span>
          <div className="scroll-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 10l5 5 5-5" />
            </svg>
          </div>
        </button>
      </div>
    </section>
  )
}
