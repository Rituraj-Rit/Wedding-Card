import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './App.css'
import RoyalBackground from './components/RoyalBackground'
import AudioPlayer from './components/AudioPlayer'
import CustomCursor from './components/CustomCursor'
import Navbar from './components/Navbar'
import Hero3DInvitation from './components/Hero3DInvitation'
import GaneshVandana from './components/GaneshVandana'
import CoupleSection from './components/CoupleSection'
import StorySection from './components/StorySection'
import CountdownSection from './components/CountdownSection'
import EventsSection from './components/EventsSection'
import GallerySection from './components/GallerySection'
import VenueSection from './components/VenueSection'
import RsvpSection from './components/RsvpSection'
import FamilyBlessingsSection from './components/FamilyBlessingsSection'
import KeepsakeBookModal from './components/KeepsakeBookModal'
import { weddingData } from './data/weddingData'

gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const [isBookModalOpen, setIsBookModalOpen] = useState(false)

  // Scroll animations with GSAP ScrollTrigger
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      const sections = document.querySelectorAll('.section-container')
      sections.forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        )
      })
    })

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <div className="royal-wedding-app">
      {/* 60FPS Golden Dust, Petals & Royal Ambient Lights */}
      <RoyalBackground />

      {/* Trailing Gold Desktop Cursor */}
      <CustomCursor />

      {/* Floating Audio Visualizer Player */}
      <AudioPlayer musicSrc={weddingData.musicFile} />

      {/* Royal Navbar */}
      <Navbar
        data={weddingData}
        onOpenBookModal={() => setIsBookModalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="royal-main-content">
        {/* 1. Cinematic 3D Interactive Invitation Hero */}
        <Hero3DInvitation
          data={weddingData}
          onOpenBookModal={() => setIsBookModalOpen(true)}
        />

        {/* 2. Auspicious Ganesh Vandana & Shloka */}
        <GaneshVandana data={weddingData} />

        {/* 3. The Royal Couple (Bride & Groom) */}
        <CoupleSection data={weddingData} />

        {/* 4. Our Journey & Story */}
        <StorySection data={weddingData} />

        {/* 5. Live Auspicious Countdown & Calendar Links */}
        <CountdownSection data={weddingData} />

        {/* 6. Wedding Events & Ceremonies */}
        <EventsSection data={weddingData} />

        {/* 7. Memory Gallery & Lightbox */}
        <GallerySection data={weddingData} />

        {/* 8. Royal Palace Venue & Concierge */}
        <VenueSection data={weddingData} />

        {/* 9. RSVP & Live Blessings Wall */}
        <RsvpSection data={weddingData} />

        {/* 10. Family Blessings & Royal Gratitude */}
        <FamilyBlessingsSection data={weddingData} />
      </main>

      {/* Interactive 3D Keepsake Flipbook Modal */}
      <KeepsakeBookModal
        data={weddingData}
        isOpen={isBookModalOpen}
        onClose={() => setIsBookModalOpen(false)}
      />
    </div>
  )
}
