import { useEffect, useRef } from 'react'
import LocomotiveScroll from 'locomotive-scroll'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useSmoothScroll(enabled = true){
  const loco = useRef(null)
  const isInitializing = useRef(false)

  useEffect(()=>{
    if(!enabled || isInitializing.current) return
    
    const root = document.querySelector('#root')
    if(!root) return

    isInitializing.current = true

    // Initialize Locomotive Scroll on root element
    try {
      loco.current = new LocomotiveScroll({ 
        el: root, 
        smooth: true, 
        inertia: 0.8,
        multiplier: 1,
        class: 'is-reveal'
      })

      // Connect Locomotive Scroll with GSAP ScrollTrigger
      ScrollTrigger.scrollerProxy(root, {
        scrollTop(value){
          return arguments.length ? loco.current.scrollTo(value, 0, 0) : loco.current.scroll.instance.scroll.y
        },
        getBoundingClientRect(){
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
          }
        },
        pinType: root.style.transform ? 'transform' : 'fixed'
      })

      // Update ScrollTrigger when Locomotive scrolls
      loco.current.on('scroll', ScrollTrigger.update)
      
      // Refresh ScrollTrigger on Locomotive update
      ScrollTrigger.addEventListener('refresh', () => {
        if(loco.current) {
          loco.current.update()
        }
      })
      
      // Initial refresh
      ScrollTrigger.refresh()
    } catch(err) {
      console.error('Error initializing Locomotive Scroll:', err)
      isInitializing.current = false
    }

    return ()=>{
      if(loco.current) {
        try {
          loco.current.destroy()
        } catch(err) {
          console.error('Error destroying Locomotive Scroll:', err)
        }
      }
      ScrollTrigger.removeEventListener('refresh', () => {})
      isInitializing.current = false
    }
  }, [enabled])
}
