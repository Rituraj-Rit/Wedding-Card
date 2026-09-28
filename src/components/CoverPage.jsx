import React, { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export default function CoverPage({data}){
  const ref = useRef()
  useEffect(()=>{
    const ctx = gsap.context(()=>{
      gsap.from(ref.current, {opacity:0, y:20, duration:0.9, ease:'power2.out'})
    }, ref)
    return ()=>ctx.revert()
  },[])

  return (
    <div className="page right" aria-label="मुख्य आवरण">
      <div className="face" ref={ref}>
        <div className="cover-hero">
          <div style={{fontSize:18,color:'#b8860b'}}>॥ श्री गणेशाय नमः ॥</div>
          <h1>शुभ विवाह</h1>
          <img src="/src/assets/couple.jpg" alt="couple" loading="eager" />
          <div style={{marginTop:12,fontWeight:700}}>{data.groom.name} ❤️ {data.bride.name}</div>
          <div style={{opacity:0.85,marginTop:6}}>06 दिसंबर 2023</div>
        </div>
      </div>
    </div>
  )
}
