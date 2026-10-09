import React, { useEffect, useRef } from 'react'

export default function RoyalBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Particle pool for golden sparks / stardust
    const particleCount = Math.min(width < 768 ? 40 : 80, 100)
    const particles = []

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 0.8,
        speedY: Math.random() * 0.45 + 0.15,
        speedX: (Math.random() - 0.5) * 0.35,
        opacity: Math.random() * 0.7 + 0.2,
        pulseSpeed: Math.random() * 0.03 + 0.01,
        color: Math.random() > 0.3 ? '#f3e2b4' : '#d8b257'
      })
    }

    // Realistic Falling Rose Petals
    const petalCount = width < 768 ? 14 : 26
    const petals = []
    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height - height,
        size: Math.random() * 9 + 8,
        speedY: Math.random() * 0.85 + 0.5,
        speedX: Math.random() * 0.6 - 0.3,
        oscillationSpeed: Math.random() * 0.02 + 0.01,
        oscillationDistance: Math.random() * 25 + 15,
        angle: Math.random() * 360,
        spinSpeed: (Math.random() - 0.5) * 1.5,
        opacity: Math.random() * 0.45 + 0.35,
        phase: Math.random() * Math.PI * 2
      })
    }

    let isVisible = true
    const handleVisibilityChange = () => {
      isVisible = !document.hidden
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    let lastTime = performance.now()

    const render = (time) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render)
        return
      }

      ctx.clearRect(0, 0, width, height)

      // 1. Draw Golden Dust
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

        const alpha = Math.max(0.1, Math.min(0.9, p.opacity))
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = alpha
        ctx.shadowBlur = 8
        ctx.shadowColor = p.color
        ctx.fill()
      }

      // 2. Draw 3D Floating Rose Petals
      for (let i = 0; i < petals.length; i++) {
        const pt = petals[i]
        pt.phase += pt.oscillationSpeed
        pt.y += pt.speedY
        pt.x += Math.sin(pt.phase) * 0.8 + pt.speedX
        pt.angle += pt.spinSpeed

        if (pt.y > height + 40) {
          pt.y = -40
          pt.x = Math.random() * width
        }

        ctx.save()
        ctx.translate(pt.x, pt.y)
        ctx.rotate((pt.angle * Math.PI) / 180)
        ctx.scale(Math.cos(pt.phase), 1) // 3D flip distortion
        ctx.globalAlpha = pt.opacity

        // Create gradient for soft velvet rose petal
        const grad = ctx.createLinearGradient(-pt.size, -pt.size, pt.size, pt.size)
        grad.addColorStop(0, '#e58079')
        grad.addColorStop(0.5, '#b93b48')
        grad.addColorStop(1, '#6b1424')

        ctx.beginPath()
        ctx.moveTo(0, -pt.size)
        ctx.bezierCurveTo(pt.size * 1.1, -pt.size * 0.5, pt.size * 0.9, pt.size * 0.7, 0, pt.size)
        ctx.bezierCurveTo(-pt.size * 0.9, pt.size * 0.7, -pt.size * 1.1, -pt.size * 0.5, 0, -pt.size)
        ctx.fillStyle = grad
        ctx.shadowBlur = 4
        ctx.shadowColor = 'rgba(84, 15, 30, 0.4)'
        ctx.fill()
        ctx.restore()
      }

      ctx.globalAlpha = 1
      ctx.shadowBlur = 0
      animationFrameId = requestAnimationFrame(render)
    }

    animationFrameId = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
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
      {/* 60FPS Golden Dust & Rose Petals Canvas */}
      <canvas ref={canvasRef} className="royal-particle-canvas" />
    </div>
  )
}
