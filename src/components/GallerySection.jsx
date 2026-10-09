import React, { useEffect, useState } from 'react'

export default function GallerySection({ data }) {
  const gallery = data.gallery || []
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(null)

  const filteredPhotos = activeFilter === 'all'
    ? gallery
    : gallery.filter((photo) => photo.category === activeFilter)

  const openLightbox = (index) => {
    setSelectedPhotoIndex(index)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setSelectedPhotoIndex(null)
    document.body.style.overflow = ''
  }

  const nextPhoto = (e) => {
    e?.stopPropagation()
    if (selectedPhotoIndex === null) return
    setSelectedPhotoIndex((prev) => (prev + 1) % filteredPhotos.length)
  }

  const prevPhoto = (e) => {
    e?.stopPropagation()
    if (selectedPhotoIndex === null) return
    setSelectedPhotoIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedPhotoIndex === null) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextPhoto()
      if (e.key === 'ArrowLeft') prevPhoto()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedPhotoIndex, filteredPhotos.length])

  return (
    <section id="gallery" className="gallery-section">
      <div className="section-container">
        <div className="section-header">
          <p className="section-eyebrow">Moments Frozen In Time</p>
          <h2 className="section-title">
            The Royal <span className="gold-text-gradient">Memory Gallery</span>
          </h2>
          <div className="ornament-divider">
            <span className="ornament-symbol">✦</span>
          </div>
          <p className="section-description">
            Glimpses of sacred rituals, laughter, and tender glances leading up to our joyous wedding union.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="gallery-filters" role="tablist">
          {['all', 'portraits', 'rituals', 'pre-wedding'].map((tab) => (
            <button
              key={tab}
              type="button"
              className={`gallery-tab-btn ${activeFilter === tab ? 'active' : ''}`}
              onClick={() => setActiveFilter(tab)}
              role="tab"
              aria-selected={activeFilter === tab}
            >
              {tab === 'all' ? 'All Moments' : tab.replace('-', ' ')}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="gallery-masonry-grid">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id || index}
              className="gallery-card interactive"
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              aria-label={`Open photo: ${photo.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter') openLightbox(index)
              }}
            >
              <div className="gallery-image-wrapper">
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="gallery-thumbnail"
                  loading="lazy"
                  decoding="async"
                />
                <div className="gallery-card-overlay">
                  <span className="gallery-zoom-icon" aria-hidden="true">✦</span>
                  <p className="gallery-card-title">{photo.title}</p>
                  <span className="gallery-card-category">{photo.category}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && filteredPhotos[selectedPhotoIndex] && (
        <div className="royal-lightbox-backdrop" onClick={closeLightbox} role="dialog" aria-modal="true">
          <div className="lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="lightbox-close-btn"
              onClick={closeLightbox}
              aria-label="Close Lightbox"
            >
              ✕
            </button>

            <button
              type="button"
              className="lightbox-nav-btn btn-prev"
              onClick={prevPhoto}
              aria-label="Previous image"
            >
              ‹
            </button>

            <div className="lightbox-body">
              <img
                src={filteredPhotos[selectedPhotoIndex].src}
                alt={filteredPhotos[selectedPhotoIndex].title}
                className="lightbox-full-img"
              />
              <div className="lightbox-caption-panel">
                <div className="lightbox-header-row">
                  <h3 className="lightbox-img-title">{filteredPhotos[selectedPhotoIndex].title}</h3>
                  <span className="lightbox-counter">
                    {selectedPhotoIndex + 1} / {filteredPhotos.length}
                  </span>
                </div>
                <p className="lightbox-desc">{filteredPhotos[selectedPhotoIndex].caption}</p>
              </div>
            </div>

            <button
              type="button"
              className="lightbox-nav-btn btn-next"
              onClick={nextPhoto}
              aria-label="Next image"
            >
              ›
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
