import React, { useEffect, useRef } from 'react'

export default function RoyalBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId = null
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    let lastWidth = width
    let lastHeight = height

    // Optimized resize handler that ignores mobile browser address bar fluctuations
    const handleResize = () => {
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight

      // If width hasn't changed and height change is small (address bar toggle), skip resizing
      if (newWidth === lastWidth && Math.abs(newHeight - lastHeight) < 120) {
        return
      }

      lastWidth = width = canvas.width = newWidth
      lastHeight = height = canvas.height = newHeight
      isMobile = newWidth < 768 || window.matchMedia('(pointer: coarse)').matches
    }

    window.addEventListener('resize', handleResize, { passive: true })

    // Particle pool: scaled down on mobile for high framerates
    const particleCount = isMobile ? 18 : 60
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: isMobile ? Math.random() * 1.4 + 0.6 : Math.random() * 2 + 0.8,
        speedY: isMobile ? Math.random() * 0.3 + 0.1 : Math.random() * 0.45 + 0.15,
        speedX: (Math.random() - 0.5) * 0.25,
        opacity: Math.random() * 0.6 + 0.2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        color: Math.random() > 0.3 ? '#f3e2b4' : '#d8b257'
      })
    }

    // Realistic Floating Petals: reduced on mobile
    const petalCount = isMobile ? 7 : 18
    const petals = []
    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: isMobile ? Math.random() * 7 + 7 : Math.random() * 9 + 8,
        speedY: isMobile ? Math.random() * 0.6 + 0.35 : Math.random() * 0.85 + 0.5,
        speedX: Math.random() * 0.4 - 0.2,
        oscillationSpeed: Math.random() * 0.02 + 0.01,
        angle: Math.random() * 360,
        spinSpeed: (Math.random() - 0.5) * 1.2,
        opacity: Math.random() * 0.4 + 0.3,
        phase: Math.random() * Math.PI * 2
      })
    }

    let isDocumentVisible = !document.hidden
    let isScrolledFar = false

    const handleVisibilityChange = () => {
      isDocumentVisible = !document.hidden
      if (isDocumentVisible && !animationFrameId && !prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render)
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    // Scroll throttle: pause particle loop when user scrolls far down (beyond 1600px) on mobile
    const handleScroll = () => {
      if (!isMobile) return
      const scrolled = window.scrollY > 1600
      if (scrolled !== isScrolledFar) {
        isScrolledFar = scrolled
        if (!isScrolledFar && !animationFrameId && isDocumentVisible && !prefersReducedMotion) {
          animationFrameId = requestAnimationFrame(render)
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })

    const render = (time) => {
      // Pause loop if page is hidden, or if scrolled far down on low-end mobile
      if (!isDocumentVisible || (isMobile && isScrolledFar)) {
        animationFrameId = null
        return
      }

      ctx.clearRect(0, 0, width, height)

      // 1. Draw Golden Dust
      // Avoid expensive ctx.shadowBlur on mobile completely
      ctx.shadowBlur = isMobile ? 0 : 3
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.y -= p.speedY
        p.x += p.speedX
        p.opacity += Math.sin(time * 0.002 + i) * p.pulseSpeed * 0.05

        if (p.y < -10) {
          p.y = height + 10
          p.x = Math.random() * width
        }
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10

        const alpha = Math.max(0.1, Math.min(0.85, p.opacity))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = alpha
        if (!isMobile) ctx.shadowColor = p.color
        ctx.fill()
      }

      // 2. Draw 3D Floating Rose Petals
      for (let i = 0; i < petals.length; i++) {
        const pt = petals[i]
        pt.phase += pt.oscillationSpeed
        pt.y += pt.speedY
        pt.x += Math.sin(pt.phase) * 0.6 + pt.speedX
        pt.angle += pt.spinSpeed

        if (pt.y > height + 30) {
          pt.y = -30
          pt.x = Math.random() * width
        }

        ctx.save()
        ctx.translate(pt.x, pt.y)
        ctx.rotate((pt.angle * Math.PI) / 180)
        ctx.scale(Math.cos(pt.phase), 1)
        ctx.globalAlpha = pt.opacity

        const grad = ctx.createLinearGradient(-pt.size, -pt.size, pt.size, pt.size)
        grad.addColorStop(0, '#e58079')
        grad.addColorStop(0.5, '#b93b48')
        grad.addColorStop(1, '#6b1424')

        ctx.beginPath()
        ctx.moveTo(0, -pt.size)
        ctx.bezierCurveTo(pt.size * 1.1, -pt.size * 0.5, pt.size * 0.9, pt.size * 0.7, 0, pt.size)
        ctx.bezierCurveTo(-pt.size * 0.9, pt.size * 0.7, -pt.size * 1.1, -pt.size * 0.5, 0, -pt.size)
        ctx.fillStyle = grad
        ctx.fill()
        ctx.restore()
      }

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0

      if (!prefersReducedMotion) {
        animationFrameId = requestAnimationFrame(render)
      }
    }

    // Single static render for reduced motion
    if (prefersReducedMotion) {
      render(0)
    } else {
      animationFrameId = requestAnimationFrame(render)
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  return (
    <div className="royal-background-container" aria-hidden="true">
      {/* Ambient Radial Lights */}
      <div className="royal-ambient-glow glow-top" />
      <div className="royal-ambient-glow glow-center" />
      <div className="royal-ambient-glow glow-bottom" />
      {/* Sacred Subtle Mandala Pattern Overlay */}
      <div className="royal-mandala-pattern" />
      {/* Golden Dust & Rose Petals Canvas */}
      <canvas ref={canvasRef} className="royal-particle-canvas" />
    </div>
  )
}
