import React from 'react'

export default function FamilyBlessingsSection({ data }) {
  const family = data.family || {}
  const bride = data.bride || {}
  const groom = data.groom || {}
  const message = data.message || {}

  return (
    <footer className="family-blessings-section">
      <div className="section-container">
        {/* Family Blessings Block */}
        <div className="family-blessings-card royal-glass-card">
          <p className="family-kicker">With the Eternal Blessings of</p>
          <h2 className="family-main-title">
            Our Beloved <span className="gold-text-gradient">Families</span>
          </h2>
          <div className="ornament-divider">
            <span className="ornament-symbol">✦</span>
          </div>

          <div className="family-columns-grid">
            <div className="family-column bride-family-col">
              <h3 className="family-col-title">Bride’s Family</h3>
              <div className="family-members-list">
                {(family.brideFamily || []).map((member, index) => (
                  <p key={index} className="family-member-name">{member}</p>
                ))}
                {(bride.parents || []).map((parent, index) => (
                  <p key={`p-${index}`} className="family-parent-name">{parent}</p>
                ))}
              </div>
            </div>

            <div className="family-center-crest" aria-hidden="true">
              <span className="crest-symbol">✦</span>
              <span className="crest-hindi">सप्रेम</span>
              <span className="crest-symbol">✦</span>
            </div>

            <div className="family-column groom-family-col">
              <h3 className="family-col-title">Groom’s Family</h3>
              <div className="family-members-list">
                {(family.groomFamily || []).map((member, index) => (
                  <p key={index} className="family-member-name">{member}</p>
                ))}
                {(groom.parents || []).map((parent, index) => (
                  <p key={`p-${index}`} className="family-parent-name">{parent}</p>
                ))}
              </div>
            </div>
          </div>

          {/* Grand Gratitude Finale */}
          <div className="gratitude-finale">
            <p className="finale-message-title">{message.title}</p>
            <p className="finale-message-subtitle">{message.subtitle}</p>

            <div className="finale-ornament" aria-hidden="true">
              <span>❧</span>
              <span className="finale-shloka">॥ मङ्गलम् भगवान विष्णुः मङ्गलम् गरुडध्वजः ॥</span>
              <span>☙</span>
            </div>

            <p className="finale-footer">{message.footer || 'With warm regards & blessings'}</p>
            <h4 className="finale-couple-names">
              {bride.name} <span>&amp;</span> {groom.name}
            </h4>

            <p className="finale-hashtag">{data.wedding?.hashtag || '#BrideWedsGroom'}</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
