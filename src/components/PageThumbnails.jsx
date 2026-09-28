import React from 'react'

export default function PageThumbnails({ pages, current, onJump }) {
  return (
    <div className="thumbnail-wrap">
      <div className="thumbnail-strip" role="navigation" aria-label="पृष्ठ थंबनेल">
        {pages.map((page, index) => (
          <button
            key={`${page.id}-${index}`}
            type="button"
            className={`thumb ${index === current ? 'is-active' : ''}`}
            onClick={() => onJump(index)}
            aria-pressed={index === current}
          >
            <span>{String(index + 1).padStart(2, '0')}</span>
            <small>{page.label}</small>
          </button>
        ))}
      </div>
    </div>
  )
}
