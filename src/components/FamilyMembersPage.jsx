import React from 'react'

export default function FamilyMembersPage({names}){
  return (
    <div className="page right" aria-label="दर्शाभिलाषी">
      <div className="face">
        <h2>दर्शाभिलाषी</h2>
        <ul>
          {names.map((n,i)=> <li key={i}>{n}</li>)}
        </ul>
      </div>
    </div>
  )
}
