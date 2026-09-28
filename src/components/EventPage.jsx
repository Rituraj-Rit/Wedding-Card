import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export default function EventPage({event}){
  const ref = useRef()
  useEffect(()=>{
    const ctx = gsap.context(()=>{
      gsap.from(ref.current, {y:20, opacity:0, duration:0.7})
    }, ref)
    return ()=>ctx.revert()
  },[])

  const styleMap = {
    tilak:{background:'#fff5e6',border:'4px solid #f5d58b'},
    haldi:{background:'#fffbe6',border:'4px solid #ffd54f'},
    wedding:{background:'#fff7f0',border:'4px solid #e6c07a'},
    vidaai:{background:'#f7f0ff',border:'4px solid #caa0ff'}
  }

  return (
    <div className="page right" aria-label={event.title}>
      <div className="face" ref={ref} style={styleMap[event.id] || {}}>
        <h2 style={{fontSize:28}}>{event.title}</h2>
        <div style={{fontSize:20,marginTop:8}}>{event.date} • {event.day}</div>
        <div style={{marginTop:12}}>समय: प्रातः 10:00 बजे (उदाहरण)</div>
      </div>
    </div>
  )
}
