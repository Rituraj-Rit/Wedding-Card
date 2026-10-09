import React, { useEffect } from 'react'
import WeddingBook from './WeddingBookEngine'

export default function KeepsakeBookModal({ data, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return undefined

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div className="keepsake-book-modal-backdrop" role="dialog" aria-modal="true" aria-label="3D Keepsake Flipbook">
      <div className="keepsake-modal-header">
        <div className="keepsake-header-left">
          <span className="keepsake-badge">✦ Interactive 3D Keepsake Album</span>
          <span className="keepsake-sub">Turn pages using buttons or arrow keys (← / →)</span>
        </div>
        <button
          type="button"
          className="keepsake-close-btn"
          onClick={onClose}
          aria-label="Close flipbook"
        >
          <span>✕ Return to Website</span>
        </button>
      </div>

      <div className="keepsake-modal-stage">
        <WeddingBook data={data} />
      </div>
    </div>
  )
}
