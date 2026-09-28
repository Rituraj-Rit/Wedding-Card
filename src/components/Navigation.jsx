import React from 'react'

export default function Navigation({ onNext, onPrev, currentPage, totalPages, isAnimating }) {
  const atFirstPage = currentPage <= 0
  const atLastPage = currentPage >= totalPages

  return (
    <nav className="book-navigation" aria-label="Book navigation">
      <button
        type="button"
        className="nav-button"
        onClick={onPrev}
        aria-label="Previous page"
        disabled={atFirstPage || isAnimating}
      >
        &lt; Previous
      </button>

      <div className="page-indicator" aria-live="polite">
        {Math.min(currentPage, totalPages)} / {totalPages}
      </div>

      <button
        type="button"
        className="nav-button"
        onClick={onNext}
        aria-label="Next page"
        disabled={atLastPage || isAnimating}
      >
        Next &gt;
      </button>
    </nav>
  )
}
