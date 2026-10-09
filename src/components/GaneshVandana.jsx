import React from 'react'

export default function GaneshVandana({ data }) {
  const shloka = data.shloka || {
    devanagari: 'ॐ वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥',
    transliteration: 'Om Vakratunda Mahakaya Suryakoti Samaprabha | Nirvighnam Kuru Me Deva Sarva-Karyeshu Sarvada ||',
    meaning: 'O Lord with the curved trunk and immense brilliance, radiant as a million suns; we pray to You to remove all obstacles from all our auspicious endeavors.'
  }

  return (
    <section id="shloka" className="ganesh-vandana-section">
      <div className="section-container">
        <div className="vandana-card royal-glass-card">
          {/* Golden Ganesha Emblem */}
          <div className="ganesha-emblem-wrapper">
            <div className="emblem-halo" />
            <img
              src="/images/ganesha.jpg"
              alt="Lord Ganesha Emblem"
              className="ganesha-crest-img"
              loading="lazy"
            />
          </div>

          <p className="vandana-kicker">Auspicious Invocation</p>
          <div className="ornament-divider">
            <span className="ornament-symbol">✦</span>
          </div>

          {/* Sacred Sanskrit Shloka */}
          <h2 className="shloka-devanagari">
            {shloka.devanagari}
          </h2>

          <p className="shloka-transliteration">
            {shloka.transliteration}
          </p>

          <p className="shloka-meaning">
            {shloka.meaning}
          </p>

          <div className="vandana-footer-crest">
            <span>|| श्री गणेशाय नमः ||</span>
          </div>
        </div>
      </div>
    </section>
  )
}
