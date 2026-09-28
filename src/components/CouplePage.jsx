import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CouplePage({data}){
  const ref = useRef()
  useEffect(()=>{
    const ctx = gsap.context(()=>{
      gsap.from(ref.current, {opacity:0, y:20, duration:0.8})
    }, ref)
    return ()=>ctx.revert()
  },[])

  return (
    <div className="page left" aria-label="परिवार परिचय">
      <div className="face" ref={ref}>
        <h2 style={{color:'#8b2b2b'}}>परिवार परिचय</h2>
        <div style={{display:'flex',gap:24,alignItems:'flex-start',flexWrap:'wrap'}}>
          <div style={{flex:'1 1 250px'}}>
            <h3>{data.groom.name}</h3>
            <div>सुपुत्र - {data.groom.father}</div>
            <div style={{marginTop:8}}>{data.groom.address}</div>
          </div>
          <div style={{flex:'1 1 250px'}}>
            <h3>{data.bride.name}</h3>
            <div>सुपुत्री - {data.bride.father}</div>
            <div style={{marginTop:8}}>{data.bride.address}</div>
          </div>
        </div>
        <div style={{textAlign:'center',marginTop:20,fontWeight:700}}>मंगल परिणय</div>
      </div>
    </div>
  )
}
