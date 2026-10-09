import React from 'react'

export default function StorySection({ data }) {
  const story = data.story || []

  return (
    <section id="story" className="story-section">
      <div className="section-container">
        <div className="section-header">
          <p className="section-eyebrow">A Timeless Love Story</p>
          <h2 className="section-title">
            Our Journey <span className="gold-text-gradient">to Forever</span>
          </h2>
          <div className="ornament-divider">
            <span className="ornament-symbol">✦</span>
          </div>
          <p className="section-description">
            Every love story is beautiful, but ours is our favorite chapter written with faith, laughter, and divine timing.
          </p>
        </div>

        {/* Timeline */}
        <div className="story-timeline">
          <div className="timeline-center-spine" aria-hidden="true" />

          {story.map((item, index) => {
            const isEven = index % 2 === 0
            return (
              <div
                key={index}
                className={`story-milestone-row ${isEven ? 'row-left' : 'row-right'}`}
              >
                {/* Milestone Node */}
                <div className="milestone-node" aria-hidden="true">
                  <span className="node-diamond">✦</span>
                </div>

                {/* Milestone Card */}
                <div className="story-card royal-glass-card">
                  <div className="story-card-header">
                    <span className="story-period">{item.period}</span>
                    <span className="story-date-badge">{item.date}</span>
                  </div>
                  <h3 className="story-card-title">{item.title}</h3>
                  <p className="story-card-text">{item.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Poetic Romantic Banner */}
        <div className="story-quote-banner royal-glass-card">
          <span className="quote-mark">“</span>
          <p className="quote-text">
            {data.message?.title || 'Two hearts, one beautiful journey, and a lifetime of togetherness.'}
          </p>
          <span className="quote-signature">— {data.bride?.name} &amp; {data.groom?.name}</span>
        </div>
      </div>
    </section>
  )
}
