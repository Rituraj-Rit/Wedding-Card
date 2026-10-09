import React from 'react'

export default function CoupleSection({ data }) {
  const bride = data.bride || {}
  const groom = data.groom || {}
  const family = data.family || {}

  return (
    <section id="couple" className="couple-section">
      <div className="section-container">
        <div className="section-header">
          <p className="section-eyebrow">The Royal Union</p>
          <h2 className="section-title">
            Meet the <span className="gold-text-gradient">Bride &amp; Groom</span>
          </h2>
          <div className="ornament-divider">
            <span className="ornament-symbol">✦</span>
          </div>
          <p className="section-description">
            Blessed by their families and guided by destiny, two lives intertwine to begin an extraordinary lifetime of togetherness.
          </p>
        </div>

        <div className="couple-cards-grid">
          {/* Bride Card */}
          <div className="couple-card bride-card royal-glass-card">
            <div className="couple-image-frame">
              <div className="image-gold-border" />
              <img
                src="/images/bride.jpg"
                alt={bride.name}
                className="couple-portrait"
                loading="lazy"
              />
              <div className="couple-role-tag">The Bride</div>
            </div>

            <div className="couple-info">
              <h3 className="couple-name">{bride.name}</h3>
              <p className="couple-lineage">
                Daughter of <strong>{(bride.parents || []).join(' & ')}</strong>
              </p>
              <p className="couple-family">
                Family of <em>{(family.brideFamily || [])[0] || 'The Sharma Family'}</em>
              </p>
              <p className="couple-bio">
                {bride.bio || 'Radiant, gentle, and blessed with eternal grace, ready to step into a new dawn surrounded by devotion and warmth.'}
              </p>
            </div>
          </div>

          {/* Central Union Knot */}
          <div className="couple-center-symbol" aria-hidden="true">
            <div className="knot-circle">
              <span className="knot-ampersand">&amp;</span>
            </div>
            <span className="knot-label">United In Love</span>
            <span className="knot-date">Nov 15, 2025</span>
          </div>

          {/* Groom Card */}
          <div className="couple-card groom-card royal-glass-card">
            <div className="couple-image-frame">
              <div className="image-gold-border" />
              <img
                src="/images/groom.jpg"
                alt={groom.name}
                className="couple-portrait"
                loading="lazy"
              />
              <div className="couple-role-tag">The Groom</div>
            </div>

            <div className="couple-info">
              <h3 className="couple-name">{groom.name}</h3>
              <p className="couple-lineage">
                Son of <strong>{(groom.parents || []).join(' & ')}</strong>
              </p>
              <p className="couple-family">
                Family of <em>{(family.groomFamily || [])[0] || 'The Verma Family'}</em>
              </p>
              <p className="couple-bio">
                {groom.bio || 'Steadfast, visionary, and blessed with an unwavering heart, stepping forward to walk the seven sacred steps for a lifetime.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
