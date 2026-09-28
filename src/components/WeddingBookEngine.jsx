import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import Navigation from './Navigation'
import './WeddingBook.css'

const sheets = [
  { id: 'cover', front: 'cover', back: 'invitation', cover: true },
  { id: 'haldi', front: 'haldi', back: 'mehendi' },
  { id: 'sangeet', front: 'sangeet', back: 'wedding' },
  { id: 'family', front: 'family', back: 'venue' },
  { id: 'final', front: 'final', back: 'closing' }
]

function getEvent(data, name) {
  return (data.events || []).find((event) => event.name?.toLowerCase() === name.toLowerCase()) || {}
}

export function PageContent({ type, data }) {
  const bride = data.bride || {}
  const groom = data.groom || {}
  const wedding = data.wedding || {}
  const invitation = data.invitation || {}
  const message = data.message || {}

  switch (type) {
    case 'cover':
      return (
        <div className="page-content physical-cover-content">
          <p className="cover-crest">शुभ विवाह</p>
          <h1>{bride.name}<span>&</span>{groom.name}</h1>
          <span className="cover-ornament" aria-hidden="true">✦</span>
          <p className="cover-caption">Together with their families</p>
        </div>
      )

    case 'invitation':
      return (
        <div className="page-content invitation-content">
          <p className="section-kicker">{invitation.heading || 'With the blessings of our families'}</p>
          <h2>{invitation.text}</h2>
          <p className="names-block">{bride.name}<span>&</span>{groom.name}</p>
        </div>
      )

    case 'haldi':
    case 'mehendi':
    case 'sangeet':
    case 'wedding':
    case 'reception': {
      const eventName = type === 'wedding' ? 'Wedding' : type
      const event = getEvent(data, eventName)
      const isWedding = type === 'wedding'
      return (
        <div className="page-content event-content">
          <p className="section-kicker">{isWedding ? 'Wedding Ceremony' : 'Wedding Festivities'}</p>
          <h2>{event.name || eventName}</h2>
          <div className="page-details">
            {event.date ? <p><strong>Date</strong><span>{event.date}</span></p> : null}
            {event.time ? <p><strong>Time</strong><span>{event.time}</span></p> : null}
            {event.venue ? <p><strong>Venue</strong><span>{event.venue}</span></p> : null}
          </div>
          {event.description ? <p className="event-note">{event.description}</p> : null}
        </div>
      )
    }

    case 'family':
      return (
        <div className="page-content family-content">
          <p className="section-kicker">With the blessings of</p>
          <div className="family-columns">
            <section>
              <h2>Bride&apos;s Family</h2>
              {(data.family?.brideFamily || []).map((person, index) => <p key={`bride-${index}`}>{person}</p>)}
            </section>
            <span className="family-divider" aria-hidden="true">✦</span>
            <section>
              <h2>Groom&apos;s Family</h2>
              {(data.family?.groomFamily || []).map((person, index) => <p key={`groom-${index}`}>{person}</p>)}
            </section>
          </div>
        </div>
      )

    case 'venue':
      return (
        <div className="page-content venue-content">
          <p className="section-kicker">The Celebration</p>
          <h2>{wedding.venue}</h2>
          <p className="venue-address">{wedding.address}</p>
          {wedding.googleMapsUrl ? (
            <a className="map-link" href={wedding.googleMapsUrl} target="_blank" rel="noreferrer">
              View Location
            </a>
          ) : null}
        </div>
      )

    case 'final':
      return (
        <div className="page-content final-content">
          <p className="section-kicker">A lifetime together</p>
          <h2>{message.title}</h2>
          <p className="final-couple">{bride.name}<span>&</span>{groom.name}</p>
          <p className="final-blessing">Your presence is our greatest blessing.</p>
        </div>
      )

    case 'closing':
      return (
        <div className="page-content closing-content">
          <span className="cover-ornament" aria-hidden="true">✦</span>
          <p>{message.footer}</p>
          <p className="final-couple">{bride.name}<span>&</span>{groom.name}</p>
        </div>
      )

    default:
      return null
  }
}

function SheetFace({ type, side, data, accessible }) {
  return (
    <div className={`sheet-face sheet-${side}`} aria-hidden={!accessible}>
      <PageContent type={type} data={data} />
    </div>
  )
}

function Sheet({ sheet, index, data, turnedSheets, sheetRef }) {
  const isTurned = index < turnedSheets
  const frontAccessible = index === turnedSheets && turnedSheets < sheets.length
  const backAccessible = index === turnedSheets - 1
  const accessible = frontAccessible || backAccessible

  return (
    <div
      ref={sheetRef}
      className={`book-sheet${sheet.cover ? ' book-cover-sheet' : ''}${isTurned ? ' is-turned' : ''}`}
      style={{ transform: `rotateY(${isTurned ? -180 : 0}deg)` }}
      aria-hidden={!accessible}
    >
      <SheetFace type={sheet.front} side="front" data={data} accessible={frontAccessible} />
      <SheetFace type={sheet.back} side="back" data={data} accessible={backAccessible} />
    </div>
  )
}

function updateSheetStack(sheetRefs, turnedSheets) {
  sheetRefs.current.forEach((sheet, index) => {
    if (!sheet) return
    const stackOrder = index < turnedSheets
      ? 10 + index
      : 100 - (index - turnedSheets)
    sheet.style.zIndex = String(stackOrder)
  })
}

export default function WeddingBook({ data }) {
  const [isOpened, setIsOpened] = useState(false)
  const [turnedSheets, setTurnedSheets] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const cameraRef = useRef(null)
  const sheetRefs = useRef([])
  const touchStartX = useRef(null)
  const turnPageRef = useRef(null)
  const isAnimatingRef = useRef(false)
  const reducedMotion = useRef(false)

  useLayoutEffect(() => {
    reducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    updateSheetStack(sheetRefs, turnedSheets)
  }, [isOpened, turnedSheets])

  useEffect(() => {
    if (!isOpened) return undefined
    const sheet = sheetRefs.current[0]
    if (!sheet) return undefined

    const duration = reducedMotion.current ? 0.01 : 1.05
    const content = sheet.querySelector('.sheet-back .page-content')
    isAnimatingRef.current = true
    setIsAnimating(true)

    const timeline = gsap.timeline({
      onComplete: () => {
        setTurnedSheets(1)
        isAnimatingRef.current = false
        setIsAnimating(false)
      }
    })
    timeline
      .to(cameraRef.current, { duration: 0.55, scale: 1.025, y: -5, ease: 'power2.out' }, 0)
      .set(sheet, { zIndex: 1000 }, 0)
      .to(sheet, {
        duration,
        rotateY: -180,
        boxShadow: '0 24px 42px rgba(19, 10, 12, 0.34)',
        ease: 'power3.inOut'
      }, 0.2)
      .to(sheet, {
        duration: 0.3,
        boxShadow: '0 8px 18px rgba(19, 10, 12, 0.16)',
        ease: 'power2.out'
      }, 1)
      .to(cameraRef.current, { duration: 0.7, scale: 1, y: 0, ease: 'power2.out' }, 0.7)

    if (content) {
      gsap.set(content, { autoAlpha: 0, y: 8 })
      timeline.to(content, { duration: 0.42, autoAlpha: 1, y: 0, ease: 'power2.out' }, 0.82)
    }

    return () => timeline.kill()
  }, [isOpened])

  const turnPage = (direction) => {
    if (isAnimatingRef.current) return
    const duration = reducedMotion.current ? 0.01 : 1

    if (direction > 0) {
      if (turnedSheets >= sheets.length) return
      const activeSheet = sheetRefs.current[turnedSheets]
      if (!activeSheet) return

      isAnimatingRef.current = true
      setIsAnimating(true)
      gsap.timeline({
        onComplete: () => {
          setTurnedSheets((count) => count + 1)
          isAnimatingRef.current = false
          setIsAnimating(false)
        }
      })
        .set(activeSheet, { zIndex: 1000 })
        .to(activeSheet, {
          duration,
          rotateY: -180,
          boxShadow: '0 26px 48px rgba(19, 10, 12, 0.34)',
          ease: 'power3.inOut'
        })
        .to(activeSheet, {
          duration: 0.28,
          boxShadow: '0 8px 18px rgba(19, 10, 12, 0.16)',
          ease: 'power2.out'
        }, '-=0.2')
      return
    }

    if (turnedSheets <= 0) return
    const activeSheet = sheetRefs.current[turnedSheets - 1]
    if (!activeSheet) return

    isAnimatingRef.current = true
    setIsAnimating(true)
    gsap.timeline({
      onComplete: () => {
        if (turnedSheets === 1) {
          setIsOpened(false)
          setTurnedSheets(0)
        } else {
          setTurnedSheets((count) => count - 1)
        }
        isAnimatingRef.current = false
        setIsAnimating(false)
      }
    })
      .set(activeSheet, { zIndex: 1000 })
      .to(activeSheet, {
        duration,
        rotateY: 0,
        boxShadow: '0 8px 18px rgba(19, 10, 12, 0.16)',
        ease: 'power3.inOut'
      })
  }
  turnPageRef.current = turnPage

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
      event.preventDefault()
      turnPageRef.current?.(event.key === 'ArrowRight' ? 1 : -1)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX
  }

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return
    const delta = event.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(delta) > 50) turnPage(delta < 0 ? 1 : -1)
  }

  const handlePointerMove = (event) => {
    if (!cameraRef.current || window.innerWidth < 768 || reducedMotion.current) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    gsap.to(cameraRef.current, {
      duration: 0.35,
      rotateY: x * 7,
      rotateX: y * -6,
      overwrite: 'auto'
    })
  }

  const resetPointer = () => {
    if (!cameraRef.current) return
    gsap.to(cameraRef.current, { duration: 0.5, rotateX: 0, rotateY: 0, overwrite: 'auto' })
  }

  const openInvitation = () => {
    if (!isOpened) setIsOpened(true)
  }

  return (
    <div className="book-wrap">
      <div className="book-scene-shell">
        {!isOpened ? (
          <div className="closed-book" aria-label="Closed wedding invitation">
            <div className="closed-book-cover">
              <p className="cover-crest">शुभ विवाह</p>
              <h1>{data.bride?.name}<span>&</span>{data.groom?.name}</h1>
              <span className="cover-ornament" aria-hidden="true">✦</span>
              <button type="button" className="open-book-button" onClick={openInvitation}>
                Open Invitation
              </button>
            </div>
          </div>
        ) : (
          <div
            className="book-stage"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onMouseMove={handlePointerMove}
            onMouseLeave={resetPointer}
          >
            <div className="book-camera" ref={cameraRef}>
              <div className="book-spine" aria-hidden="true" />
              {turnedSheets === sheets.length ? <div className="inside-back-cover" aria-hidden="true" /> : null}
              <div className="book">
                {sheets.map((sheet, index) => (
                  <Sheet
                    key={sheet.id}
                    sheet={sheet}
                    index={index}
                    data={data}
                    turnedSheets={turnedSheets}
                    sheetRef={(element) => { sheetRefs.current[index] = element }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {isOpened ? (
        <Navigation
          currentPage={turnedSheets}
          totalPages={sheets.length}
          onPrev={() => turnPage(-1)}
          onNext={() => turnPage(1)}
          isAnimating={isAnimating}
        />
      ) : null}
    </div>
  )
}