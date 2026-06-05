"use client"

import { useState } from "react"
import "./MapSection.css"

const markerData = [
  {
    id: 1,
    label: '8',
    left: '45%',
    top: '50%',
    colorClass: 'bg-danger',
    name: 'Bici Elettrica',
    plate: 'GW-002',
    photo: 'https://contents.mediadecathlon.com/p2470104/k$bb8284972e2e02dcd39329bbb9de5fd3/sq/bici-mtb-elettrica-a-pedalata-assistita-e-expl-520-gialla-29-500-wh.jpg?format=auto&f=969x969',
    status: 'In manutenzione',
    battery: '41%',
    location: 'Via Roma 21',
    lastChecked: '5 min fa',
    issue: 'Freno anteriore da regolare'
  },
  {
    id: 2,
    label: '12',
    left: '70%',
    top: '25%',
    colorClass: 'bg-primary',
    name: 'Bici Tradizionale',
    plate: 'GW-006',
    photo: 'https://www.noleggiogrimaldi.it/wp-content/uploads/noleggio_bici_elettrica-1024x651.jpeg',
    status: 'Disponibile',
    battery: 'N/A',
    location: 'Piazza Centrale',
    lastChecked: '10 min fa',
    issue: 'Nessuna anomalia'
  },
  {
    id: 3,
    label: '3',
    left: '20%',
    top: '30%',
    colorClass: 'bg-success',
    name: 'Automobile',
    plate: 'GW-007',
    photo: 'https://lpwebsite-prod-s3cdn.leapmotor-international.com/public/t03/T03-details.jpg',
    status: 'In uso',
    battery: '76%',
    location: 'Via Milano 45',
    lastChecked: '2 min fa',
    issue: 'Cambio olio programmato'
  }
]

export function MapSection() {
  const [activeMarker, setActiveMarker] = useState(null)

  return (
    <div className="map-card">
      <div className="map-wrapper" onClick={() => setActiveMarker(null)}>
        <iframe
          className="map-iframe"
          title="Mappa"
          src="https://www.openstreetmap.org/export/embed.html?bbox=9.12078857421875%2C45.25013418721634%2C10.7830810546875%2C45.822425936265016&layer=mapnik"
        />

        {markerData.map(marker => (
          <div
            key={marker.id}
            className={`map-marker ${marker.colorClass}`}
            style={{ left: marker.left, top: marker.top }}
            onClick={(event) => {
              event.stopPropagation()
              setActiveMarker(marker)
            }}
          >
            {marker.label}
          </div>
        ))}

        {activeMarker && (
          <div
            className="map-popup"
            style={{ left: activeMarker.left, top: activeMarker.top }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="map-popup-close"
              onClick={() => setActiveMarker(null)}
              aria-label="Chiudi popup"
            >
              ×
            </button>
            <div className="map-popup-content">
              <div className="map-popup-meta">
                <h4>{activeMarker.name}</h4>
                <p>{activeMarker.plate}</p>
              </div>
              {activeMarker.photo && (
                <img
                  src={activeMarker.photo}
                  alt={`${activeMarker.name} foto`}
                />
              )}
              <ul className="map-popup-details">
                <li><strong>Stato:</strong> {activeMarker.status}</li>
                <li><strong>Posizione:</strong> {activeMarker.location}</li>
                <li><strong>Ultimo controllo:</strong> {activeMarker.lastChecked}</li>
                <li><strong>Batteria:</strong> {activeMarker.battery}</li>
                <li><strong>Note:</strong> {activeMarker.issue}</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      <div className="map-footer">
        Legenda per la mappa
      </div>
    </div>
  )
}
