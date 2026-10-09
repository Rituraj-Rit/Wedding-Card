import React, { useEffect, useState } from 'react'
import {
  subscribeAudioState,
  toggleWeddingAudio,
  playWeddingAudio,
  toggleMuteWeddingAudio
} from '../utils/audioManager'

export default function AudioPlayer() {
  const [audioState, setAudioState] = useState({
    isPlaying: false,
    isMuted: false,
    hasError: false
  })
  const [showTooltip, setShowTooltip] = useState(false)

  useEffect(() => {
    const unsubscribe = subscribeAudioState((newState) => {
      setAudioState(newState)
    })
    return () => unsubscribe()
  }, [])

  const handleToggle = (e) => {
    e.stopPropagation()
    toggleWeddingAudio()
  }

  const handleRetry = (e) => {
    e.stopPropagation()
    playWeddingAudio()
  }

  return (
    <div
      className="audio-player-wrapper"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Floating Status Tooltip */}
      <div className={`audio-tooltip ${showTooltip ? 'visible' : ''}`}>
        <span className="tooltip-title">Auspicious Wedding Shehnai</span>
        <span className="tooltip-status">
          {audioState.hasError
            ? 'Playback error • Click to Retry'
            : audioState.isPlaying
            ? 'Music Playing • Click to Pause'
            : 'Music Paused • Click to Play'}
        </span>
      </div>

      <button
        type="button"
        className={`audio-floating-btn ${audioState.isPlaying ? 'playing' : ''} ${audioState.hasError ? 'error' : ''}`}
        onClick={audioState.hasError ? handleRetry : handleToggle}
        aria-label={audioState.isPlaying ? 'Pause wedding music' : 'Play wedding music'}
        title={audioState.isPlaying ? 'Pause wedding music' : 'Play wedding music'}
      >
        {/* Animated Sound Wave Bars */}
        <div className="audio-wave-bars" aria-hidden="true">
          <span className={`bar bar-1 ${audioState.isPlaying ? 'active' : ''}`} />
          <span className={`bar bar-2 ${audioState.isPlaying ? 'active' : ''}`} />
          <span className={`bar bar-3 ${audioState.isPlaying ? 'active' : ''}`} />
          <span className={`bar bar-4 ${audioState.isPlaying ? 'active' : ''}`} />
        </div>

        {/* Central Music / Pause Icon */}
        <div className="audio-center-icon">
          {audioState.hasError ? (
            <span style={{ fontSize: '13px' }}>↺</span>
          ) : audioState.isPlaying ? (
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
