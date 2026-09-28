import React from 'react'

const petalStyles = [
  { size: 12, left: '8%', delay: '0s', duration: '18s', rotate: '18deg' },
  { size: 10, left: '18%', delay: '3s', duration: '21s', rotate: '-20deg' },
  { size: 14, left: '28%', delay: '5s', duration: '19s', rotate: '15deg' },
  { size: 8, left: '40%', delay: '8s', duration: '22s', rotate: '-15deg' },
  { size: 13, left: '52%', delay: '2s', duration: '20s', rotate: '28deg' },
  { size: 9, left: '64%', delay: '7s', duration: '24s', rotate: '-18deg' },
  { size: 15, left: '72%', delay: '1s', duration: '17s', rotate: '24deg' },
  { size: 12, left: '82%', delay: '6s', duration: '25s', rotate: '-24deg' },
  { size: 11, left: '90%', delay: '4s', duration: '23s', rotate: '12deg' },
  { size: 10, left: '15%', delay: '9s', duration: '18s', rotate: '-8deg' },
  { size: 14, left: '46%', delay: '10s', duration: '26s', rotate: '21deg' },
  { size: 9, left: '58%', delay: '11s', duration: '21s', rotate: '-28deg' }
]

export default function FloatingPetals() {
  return (
    <div className="petal-layer" aria-hidden="true">
      {petalStyles.map((petal, index) => (
        <span
          key={index}
          className="petal"
          style={{
            width: `${petal.size}px`,
            height: `${petal.size * 1.4}px`,
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
            transform: `rotate(${petal.rotate})`
          }}
        />
      ))}
    </div>
  )
}
