import { weddingData } from '../data/weddingData.js'

/**
 * Singleton Audio Manager for Wedding Music
 * Solves mobile autoplay restrictions by providing immediate synchronous playback
 * inside user gestures and ensuring no duplicate audio instances are ever spawned.
 */

let globalAudio = null
const stateListeners = new Set()

let audioState = {
  isPlaying: false,
  isMuted: false,
  hasError: false,
  errorMessage: ''
}

function notifyListeners() {
  stateListeners.forEach((listener) => {
    try {
      listener({ ...audioState })
    } catch (e) {
      console.warn('Audio listener error:', e)
    }
  })
}

export function getWeddingAudio() {
  if (typeof window === 'undefined') return null

  if (!globalAudio) {
    globalAudio = new Audio()
    // Local fast asset with fallback to remote CDN
    globalAudio.src = '/audio/wedding.mp3'
    globalAudio.loop = true
    globalAudio.preload = 'auto'
    globalAudio.volume = 0.8

    // Fallback if local file fails
    let hasAttemptedFallback = false
    globalAudio.addEventListener('error', () => {
      if (!hasAttemptedFallback && weddingData.musicFile) {
        hasAttemptedFallback = true
        console.warn('Local audio failed or not found, falling back to remote CDN audio')
        globalAudio.src = weddingData.musicFile
        if (audioState.isPlaying) {
          globalAudio.play().catch((err) => {
            console.warn('Fallback audio playback failed:', err)
          })
        }
      } else {
        audioState.hasError = true
        audioState.isPlaying = false
        audioState.errorMessage = 'Audio playback error'
        notifyListeners()
      }
    })

    globalAudio.addEventListener('play', () => {
      audioState.isPlaying = true
      audioState.hasError = false
      notifyListeners()
    })

    globalAudio.addEventListener('pause', () => {
      audioState.isPlaying = false
      notifyListeners()
    })

    globalAudio.addEventListener('volumechange', () => {
      audioState.isMuted = globalAudio.muted
      notifyListeners()
    })
  }

  return globalAudio
}

/**
 * Synchronous playback trigger to be called directly in click/touch handlers.
 * Guaranteed to run in the current user gesture event loop.
 */
export function playWeddingAudio() {
  const audio = getWeddingAudio()
  if (!audio) return Promise.resolve(false)

  // Avoid duplicate overlapping playback if already active
  if (!audio.paused && audioState.isPlaying) {
    return Promise.resolve(true)
  }

  try {
    audio.muted = false
    const promise = audio.play()
    if (promise !== undefined) {
      return promise
        .then(() => {
          audioState.isPlaying = true
          audioState.hasError = false
          notifyListeners()
          return true
        })
        .catch((err) => {
          // Play was interrupted or blocked
          console.warn('Audio play request blocked or failed:', err.message || err)
          audioState.isPlaying = false
          notifyListeners()
          return false
        })
    }
    return Promise.resolve(true)
  } catch (err) {
    console.warn('Direct audio play call error:', err)
    audioState.isPlaying = false
    notifyListeners()
    return Promise.resolve(false)
  }
}

export function pauseWeddingAudio() {
  const audio = getWeddingAudio()
  if (!audio) return
  audio.pause()
  audioState.isPlaying = false
  notifyListeners()
}

export function toggleWeddingAudio() {
  const audio = getWeddingAudio()
  if (!audio) return
  if (audio.paused) {
    return playWeddingAudio()
  } else {
    pauseWeddingAudio()
  }
}

export function toggleMuteWeddingAudio() {
  const audio = getWeddingAudio()
  if (!audio) return
  audio.muted = !audio.muted
  audioState.isMuted = audio.muted
  notifyListeners()
}

export function subscribeAudioState(callback) {
  stateListeners.add(callback)
  // Provide current state immediately
  callback({ ...audioState })
  return () => {
    stateListeners.delete(callback)
  }
}
