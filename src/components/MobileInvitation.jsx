import React, { useEffect, useRef, useState } from 'react'
import { PageContent } from './WeddingBookEngine'
import './MobileInvitation.css'

function createSections(data) {
  const eventTypes = ['haldi', 'mehendi', 'sangeet', 'wedding', 'reception']
  const eventSections = eventTypes.flatMap((type) => {
    const event = data.events?.find((item) => item.name?.toLowerCase() === type)
    return event ? [{ id: type, type, label: event.name }] : []
  })

  return [
    { id: 'cover', label: 'Invitation', type: 'cover' },
    { id: 'couple', label: 'Couple', type: 'couple' },
    { id: 'details', label: 'Wedding details', type: 'details' },
    ...eventSections,
    { id: 'venue', label: 'Venue', type: 'venue' },
    { id: 'family', label: 'Family', type: 'family' },
    { id: 'closing', label: 'Thank you', type: 'final' }
  ]
}

function SectionContent({ section, data }) {
  if (section.type === 'couple') {
    return (
      <div className="mobile-page-content mobile-couple-content">
        <p className="section-kicker">The happy couple</p>
        <h1>{data.bride?.name}<span>&</span>{data.groom?.name}</h1>
        <p>{data.invitation?.heading}</p>
      </div>
    )
  }

  if (section.type === 'details') {
    return (
      <div className="mobile-page-content mobile-details-content">
        <p className="section-kicker">The Wedding</p>
        <h1>Wedding Details</h1>
        <div className="page-details">
          {data.wedding?.date ? <p><strong>Date</strong><span>{data.wedding.date}</span></p> : null}
          {data.wedding?.time ? <p><strong>Time</strong><span>{data.wedding.time}</span></p> : null}
          {data.wedding?.venue ? <p><strong>Venue</strong><span>{data.wedding.venue}</span></p> : null}
        </div>
      </div>
    )
  }

  return (
    <div className={`mobile-page-content mobile-content-${section.type}`}>
      <PageContent type={section.type} data={data} />
      {section.type === 'cover' ? <span className="mobile-swipe-hint">Swipe up to begin</span> : null}
    </div>
  )
}

export default function MobileInvitation({ data }) {
  const sections = createSections(data)
  const viewportRef = useRef(null)
  const sectionRefs = useRef([])
  const [activeIndex, setActiveIndex] = useState(0)
  const [visibleSections, setVisibleSections] = useState(() => new Set([0]))

  useEffect(() => {
    const viewport = viewportRef.current
    if (!viewport) return undefined

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const index = Number(entry.target.dataset.sectionIndex)
        setActiveIndex(index)
        setVisibleSections((visible) => {
          if (visible.has(index)) return visible
          const next = new Set(visible)
          next.add(index)
          return next
        })
      })
    }, { root: viewport, threshold: 0.6 })

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [sections.length])

  const goToSection = (index) => {
    sectionRefs.current[index]?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start'
    })
  }

  return (
    <main className="mobile-invitation-viewport" ref={viewportRef} aria-label="Wedding invitation">
      {sections.map((section, index) => (
        <section
          key={section.id}
          id={`mobile-${section.id}`}
          ref={(element) => { sectionRefs.current[index] = element }}
          data-section-index={index}
          className={`mobile-invitation-page${visibleSections.has(index) ? ' is-visible' : ''}`}
          aria-label={section.label}
        >
          <SectionContent section={section} data={data} />
        </section>
      ))}

      <nav className="mobile-page-dots" aria-label="Invitation pages">
        {sections.map((section, index) => (
          <button
            key={section.id}
            type="button"
            className={`mobile-page-dot${activeIndex === index ? ' is-active' : ''}`}
            aria-label={`Go to ${section.label}`}
            aria-current={activeIndex === index ? 'page' : undefined}
            onClick={() => goToSection(index)}
          />
        ))}
      </nav>
    </main>
  )
}