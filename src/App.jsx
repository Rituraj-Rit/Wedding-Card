import React, { useEffect, useState } from 'react'
import './App.css'
import MusicButton from './components/MusicButton'
import WeddingBook from './components/WeddingBookEngine'
import MobileInvitation from './components/MobileInvitation'
import FloatingPetals from './components/FloatingPetals'
import { weddingData } from './data/weddingData'

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [isMobile, setIsMobile] = useState(() => window.matchMedia('(max-width: 600px)').matches)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsReady(true), 180)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 600px)')
    const updateLayout = (event) => setIsMobile(event.matches)
    mediaQuery.addEventListener('change', updateLayout)
    return () => mediaQuery.removeEventListener('change', updateLayout)
  }, [])

  return (
    <div className={`invitation-app${isMobile ? ' mobile-mode' : ''}`}>
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="ambient ambient-three" aria-hidden="true" />
      <FloatingPetals />

      <MusicButton musicSrc={weddingData.musicFile} />

      {isMobile ? (
        <MobileInvitation data={weddingData} />
      ) : (
        <div className={`book-scene ${isReady ? 'loaded' : ''}`}>
          <WeddingBook data={weddingData} />
        </div>
      )}
    </div>
  )
}
