import React from 'react'

export default function FamilyPage({data}){
  return (
    <div className="page left" aria-label="परिवार">
      <div className="face">
        <h2>परिवार</h2>
        <div style={{marginTop:8}}>
          <strong>{data.groom.name}</strong>
          <div>सुपुत्र - {data.groom.father}</div>
          <div>{data.groom.address}</div>
        </div>
        <div style={{marginTop:16}}>
          <strong>{data.bride.name}</strong>
          <div>सुपुत्री - {data.bride.father}</div>
          <div>{data.bride.address}</div>
        </div>
      </div>
    </div>
  )
}
