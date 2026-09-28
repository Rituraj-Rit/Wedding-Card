import React, { useEffect, useState } from 'react'
import './App.css'
import MusicButton from './components/MusicButton'
import WeddingBook from './components/WeddingBookEngine'
import FloatingPetals from './components/FloatingPetals'
import { weddingData } from './data/weddingData'

export default function App() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsReady(true), 180)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <div className="invitation-app">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <div className="ambient ambient-three" aria-hidden="true" />
      <FloatingPetals />

      <MusicButton musicSrc={weddingData.musicFile} />

      <div className={`book-scene ${isReady ? 'loaded' : ''}`}>
        <WeddingBook data={weddingData} />
      </div>
    </div>
  )
}
