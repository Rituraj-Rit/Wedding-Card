import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function LoadingScreen({onFinish}){
  const ref = useRef()
  useEffect(()=>{
    const ctx = gsap.context(()=>{
      const tl = gsap.timeline({onComplete: onFinish})
      tl.fromTo(ref.current, {opacity:0, y:20}, {opacity:1,y:0,duration:0.9})
      tl.to(ref.current, {opacity:0,duration:0.6,delay:0.6})
    }, ref)
    return ()=> ctx.revert()
  },[onFinish])
  return (
    <div ref={ref} style={{position:'fixed',inset:0,display:'flex',alignItems:'center',justifyContent:'center',zIndex:2000,background:'rgba(12,6,6,0.6)'}}>
      <div style={{textAlign:'center',color:'#f8e9d6'}}>
        <div style={{fontSize:28}}>॥ श्री गणेशाय नमः ॥</div>
        <div style={{fontSize:20,marginTop:8}}>शुभ विवाह</div>
      </div>
    </div>
  )
}
