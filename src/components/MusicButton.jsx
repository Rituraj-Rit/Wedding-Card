import React, { useRef, useState, useEffect } from 'react'
import { weddingData } from '../data/weddingData'
import './MusicButton.css'

export default function MusicButton({ musicSrc = weddingData.musicFile }){
  const audioRef = useRef(null)
  const [playing, setPlaying] = useState(false)

  useEffect(()=>{
    return ()=>{ 
      if(audioRef.current){ 
        audioRef.current.pause()
        audioRef.current.src=''
      } 
    }
  },[])

  const toggle = ()=>{
    if(!audioRef.current) return
    if(playing){ 
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
    }
  }

  return (
    <div className="music-btn">
      <button 
        aria-label={playing ? 'Pause wedding music' : 'Play wedding music'}
        onClick={toggle}
        className={`music-toggle ${playing ? 'playing' : ''}`}
        aria-pressed={playing}
      >
        {playing ? 'Ⅱ' : '♫'}
      </button>
      <audio ref={audioRef} src={musicSrc} loop preload="none" />
    </div>
  )
}
