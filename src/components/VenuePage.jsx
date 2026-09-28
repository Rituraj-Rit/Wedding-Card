import React from 'react'

export default function VenuePage({venue}){
  const openMaps = ()=>{
    if(venue.googleMapsUrl){ window.open(venue.googleMapsUrl,'_blank') }
    else alert('Google Maps URL उपलब्ध नहीं है')
  }
  return (
    <div className="page left" aria-label="कार्यक्रम स्थल">
      <div className="face">
        <h2>{venue.title}</h2>
        <p>{venue.description}</p>
        <div style={{marginTop:8}}>{venue.village}, {venue.post}, {venue.district}</div>
        <button style={{marginTop:12}} onClick={openMaps}>📍 विवाह स्थल देखें</button>
      </div>
    </div>
  )
}
