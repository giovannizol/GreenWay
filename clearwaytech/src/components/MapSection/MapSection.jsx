"use client"

import "./MapSection.css"

export function MapSection() {
  return (
    <div className="map-card">
      <div className="map-wrapper">
        <iframe
          src="https://www.openstreetmap.org/export/embed.html?bbox=12.42%2C41.87%2C12.54%2C41.93&amp;layer=mapnik"
          className="map-iframe"
          title="Mappa"
        />
        <div className="map-marker bg-success" style={{left: '20%', top: '30%'}}>3</div>
        <div className="map-marker bg-success" style={{left: '45%', top: '50%'}}>8</div>
        <div className="map-marker bg-info" style={{left: '70%', top: '25%'}}>12</div>
        <div className="map-marker bg-success" style={{left: '35%', top: '70%'}}>5</div>
        <div className="map-marker bg-warning" style={{left: '60%', top: '75%'}}>2</div>
      </div>
      <div className="map-footer">
        Legenda per la mappa
      </div>
    </div>
  )
}
