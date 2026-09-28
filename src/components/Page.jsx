import React, { forwardRef } from 'react'

const Page = forwardRef(function Page({ children, side = 'right', pageNumber = 0, className = '' }, ref) {
  return (
    <div
      ref={ref}
      className={`page-sheet page-sheet--${side} ${className}`.trim()}
      data-page={pageNumber}
    >
      <div className="page-face page-front">
        <div className="page-inner">{children}</div>
      </div>
      <div className="page-face page-back">
        <div className="page-inner page-inner--back">
          <div className="paper-back-pattern" aria-hidden="true" />
        </div>
      </div>
    </div>
  )
})

export default Page
