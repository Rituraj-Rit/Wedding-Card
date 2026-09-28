import React, { useCallback, useEffect, useRef, useState } from 'react'
import { weddingData } from '../data/weddingData'
import './MusicButton.css'

export default function MusicButton({ musicSrc = weddingData.musicFile }) {
  const audioRef = useRef(null)
  const startedRef = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [unavailable, setUnavailable] = useState(false)

  const startPlayback = useCallback(() => {
    const audio = audioRef.current
    if (!audio || !audio.paused || unavailable) return

    try {
      const playback = audio.play()
      if (playback) {
        playback.catch(() => {
          startedRef.current = false
          setPlaying(false)
        })
      }
    } catch {
      startedRef.current = false
      setPlaying(false)
    }
  }, [unavailable])

  useEffect(() => {
    const startAfterInteraction = (event) => {
      if (event.target instanceof Element && event.target.closest('.music-btn')) return
      if (startedRef.current) return
      startedRef.current = true
      startPlayback()
    }

    const startAfterKeyboardInteraction = (event) => {
      if (!['Enter', ' ', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp'].includes(event.key)) return
      startAfterInteraction(event)
    }

    document.addEventListener('pointerdown', startAfterInteraction, true)
    document.addEventListener('keydown', startAfterKeyboardInteraction, true)

    return () => {
      document.removeEventListener('pointerdown', startAfterInteraction, true)
      document.removeEventListener('keydown', startAfterKeyboardInteraction, true)
    }
  }, [startPlayback])

  useEffect(() => () => {
    audioRef.current?.pause()
  }, [])

  const togglePlayback = () => {
    const audio = audioRef.current
    if (!audio || unavailable) return

    if (audio.paused) {
      startedRef.current = true
      startPlayback()
    } else {
      audio.pause()
    }
  }

  const handleAudioError = () => {
    startedRef.current = false
    setPlaying(false)
    setUnavailable(true)
  }

  const buttonLabel = unavailable
    ? `Wedding music unavailable: ${musicSrc}`
    : playing
      ? 'Music ON. Pause wedding music'
      : 'Music OFF. Play wedding music'

  return (
    <div className="music-btn">
      <button
        type="button"
        aria-label={buttonLabel}
        aria-pressed={playing}
        title={buttonLabel}
        onClick={togglePlayback}
        className={`music-toggle ${playing ? 'playing' : ''}`}
        disabled={unavailable}
      >
        {unavailable ? '×' : playing ? 'Ⅱ' : '♫'}
      </button>
      <audio
        ref={audioRef}
        src={musicSrc}
        loop
        preload="none"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={handleAudioError}
      />
    </div>
  )
}
