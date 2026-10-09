import React, { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const cursorDotRef = useRef(null)
  const cursorRingRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isTouchDevice, setIsTouchDevice] = useState(true)

  useEffect(() => {
    // Check if device supports fine hover cursor
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true)
      return
    }
    setIsTouchDevice(false)

    let mouseX = -100
    let mouseY = -100
    let ringX = -100
    let ringY = -100
    let rafId

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (!isVisible) setIsVisible(true)

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`
      }
    }

    const onMouseEnter = () => setIsVisible(true)
    const onMouseLeave = () => setIsVisible(false)

    // Smooth lerp for trailing ring
    const renderRing = () => {
      ringX += (mouseX - ringX) * 0.16
      ringY += (mouseY - ringY) * 0.16

      if (cursorRingRef.current) {
        cursorRingRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      }
      rafId = requestAnimationFrame(renderRing)
    }

    rafId = requestAnimationFrame(renderRing)

    // Detect hover on interactive elements
    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.closest('button') ||
        target.closest('a') ||
        target.closest('.interactive') ||
        target.closest('.gallery-card') ||
        target.closest('.invitation-envelope')
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseenter', onMouseEnter)
    window.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseenter', onMouseEnter)
      window.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseover', handleMouseOver)
    }
  }, [isVisible])

  if (isTouchDevice) return null

  return (
    <div className={`royal-cursor-system ${isVisible ? 'visible' : ''}`} aria-hidden="true">
      <div
        ref={cursorDotRef}
        className={`cursor-dot ${isHovered ? 'hovered' : ''}`}
      />
      <div
        ref={cursorRingRef}
        className={`cursor-ring ${isHovered ? 'hovered' : ''}`}
      />
    </div>
  )
}
