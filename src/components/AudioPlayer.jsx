import React, { useCallback, useEffect, useRef, useState } from 'react'
import { weddingData } from '../data/weddingData'

export default function AudioPlayer({ musicSrc = weddingData.musicFile }) {
  const audioRef = useRef(null)
  const hasInteractedRef = useRef(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)

  const playAudio = useCallback(() => {
    const audio = audioRef.current
    if (!audio || hasError) return

    audio.volume = 0.8
    const playPromise = audio.play()
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true)
          setHasError(false)
        })
        .catch(() => {
          // Autoplay blocked by browser policy until interaction
          setIsPlaying(false)
        })
    }
  }, [hasError])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio || hasError) return

    if (isPlaying) {
      audio.pause()
      setIsPlaying(false)
    } else {
      playAudio()
    }
  }

  // Attempt gentle autoplay on first user click anywhere on screen
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (hasInteractedRef.current) return
      hasInteractedRef.current = true
      playAudio()
    }

    window.addEventListener('click', handleFirstInteraction, { once: true })
    window.addEventListener('touchstart', handleFirstInteraction, { once: true })

    return () => {
      window.removeEventListener('click', handleFirstInteraction)
      window.removeEventListener('touchstart', handleFirstInteraction)
    }
  }, [playAudio])

  return (
    <div
      className="audio-player-wrapper"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <audio
        ref={audioRef}
        src={musicSrc}
        loop
        preload="auto"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onError={() => setHasError(true)}
      />

      {/* Floating Status Tooltip */}
      <div className={`audio-tooltip ${showTooltip ? 'visible' : ''}`}>
        <span className="tooltip-title">Auspicious Wedding Shehnai</span>
        <span className="tooltip-status">{isPlaying ? 'Playing • Click to Pause' : 'Click to Play Music'}</span>
      </div>

      <button
        type="button"
        className={`audio-floating-btn ${isPlaying ? 'playing' : ''}`}
        onClick={togglePlay}
        aria-label={isPlaying ? 'Pause wedding music' : 'Play wedding music'}
        title={isPlaying ? 'Pause music' : 'Play music'}
      >
        {/* Animated Sound Wave Bars */}
        <div className="audio-wave-bars" aria-hidden="true">
          <span className={`bar bar-1 ${isPlaying ? 'active' : ''}`} />
          <span className={`bar bar-2 ${isPlaying ? 'active' : ''}`} />
          <span className={`bar bar-3 ${isPlaying ? 'active' : ''}`} />
          <span className={`bar bar-4 ${isPlaying ? 'active' : ''}`} />
        </div>

        {/* Central Music / Lotus Motif */}
        <div className="audio-center-icon">
          {isPlaying ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </div>
      </button>
    </div>
  )
}
