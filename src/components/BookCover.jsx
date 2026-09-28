import React, { forwardRef } from 'react'

const BookCover = forwardRef(function BookCover({ data, isOpen = false, onOpen }, ref) {
  return (
    <div ref={ref} className={`book-cover ${isOpen ? 'is-open' : ''}`}>
      <div className="cover-face cover-front">
        <div className="cover-inner">
          <div className="cover-ornament">॥ श्री गणेशाय नमः ॥</div>
          <h1>शुभ विवाह</h1>
          <div className="cover-couple">
            <span>{data.groom.name}</span>
            <span className="heart">❤️</span>
            <span>{data.bride.name}</span>
          </div>
          <div className="cover-date">06 दिसंबर 2023</div>
          <button type="button" className="open-book-btn" onClick={onOpen}>
            आमंत्रण खोलें
          </button>
        </div>
      </div>
      <div className="cover-face cover-back" aria-hidden="true">
        <div className="cover-back-pattern" />
      </div>
    </div>
  )
})

export default BookCover
