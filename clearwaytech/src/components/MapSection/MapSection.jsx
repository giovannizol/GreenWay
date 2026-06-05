"use client"

import { useState, useEffect, useMemo } from "react"
import "./MapSection.css"
import MapLegend from "./MapLegend"

const markerData = [
  {
    id: 1,
    label: '8',
    left: '45%',
    top: '50%',
    colorClass: 'bg-danger',
    name: 'Occupato',
    plate: 'GW-002',
    photo: 'https://contents.mediadecathlon.com/p2470104/k$bb8284972e2e02dcd39329bbb9de5fd3/sq/bici-mtb-elettrica-a-pedalata-assistita-e-expl-520-gialla-29-500-wh.jpg?format=auto&f=969x969',
    status: 'Occupato',
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
    name: 'Ricarica',
    plate: 'GW-006',
    photo: 'https://www.noleggiogrimaldi.it/wp-content/uploads/noleggio_bici_elettrica-1024x651.jpeg',
    status: 'In ricarica',
    battery: '1%',
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
    name: 'Disponibile',
    plate: 'GW-007',
    photo: 'https://lpwebsite-prod-s3cdn.leapmotor-international.com/public/t03/T03-details.jpg',
    status: 'Disponibile',
    battery: '76%',
    location: 'Via Milano 45',
    lastChecked: '2 min fa',
    issue: 'Cambio olio programmato'
  },
  {
  id: 4,
    label: '4',
    left: '50%',
    top: '80%',
    colorClass: 'bg-warning',
    name: 'Manutenzione',
    plate: 'GW-007',
    photo: 'https://lpwebsite-prod-s3cdn.leapmotor-international.com/public/t03/T03-details.jpg',
    status: 'In manutenzione',
    battery: '76%',
    location: 'Via Milano 45',
    lastChecked: '2 min fa',
    issue: 'Cambio olio programmato'
  }
]

export function MapSection() {
  const [activeMarker, setActiveMarker] = useState(null)
  const [expanded, setExpanded] = useState(false)
  const [blurred, setBlurred] = useState(false)

  const legendItems = useMemo(() => 
    [...new Map(markerData.map(m => [m.name, { name: m.name, colorClass: m.colorClass }])).values()],
    []
  )

  const [selectedCategories, setSelectedCategories] = useState(legendItems.map(it => it.name))

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    )
  }

  const visibleMarkers = markerData.filter(m => selectedCategories.includes(m.name))

  const popupPlacement = activeMarker && Number(activeMarker.top.replace('%', '')) < 20 ? 'bottom' : 'top'

  useEffect(() => {
    if (expanded) {
      document.body.style.overflow = 'hidden'
      setBlurred(false)
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [expanded])

  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setExpanded(false)
    }
    if (expanded) window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [expanded])

  return (
    <div className={`map-card ${expanded ? 'expanded' : ''}`}>
      <div className="map-wrapper" onClick={() => setActiveMarker(null)}>
        <button
          className={`map-expand-btn ${expanded ? 'is-expanded' : ''}`}
          onClick={(e) => { e.stopPropagation(); setExpanded(v => !v) }}
          aria-pressed={expanded}
          aria-label={expanded ? 'Riduci mappa' : 'Espandi mappa'}
        >
          {expanded ? '<>' : '><'}
        </button>
        <iframe
          className={`map-iframe ${blurred && !expanded ? 'is-blurred' : ''}`}
          title="Mappa"
          src="https://www.openstreetmap.org/export/embed.html?bbox=12.59%2C45.88%2C12.73%2C46.02&layer=mapnik"
        />

        {visibleMarkers.map(marker => (
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

        {/* <MapLegend 
          items={legendItems} 
          selectedItems={selectedCategories} 
          onToggle={toggleCategory} 
        /> */}

        {activeMarker && visibleMarkers.some(m => m.id === activeMarker.id) && (
          <div
            className={`map-popup ${popupPlacement === 'bottom' ? 'bottom' : 'top'}`}
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
        <div className="map-legend-footer">
          {legendItems.map((it, idx) => {
            const isSelected = selectedCategories.includes(it.name);
            return (
              <div 
                key={idx} 
                className={`footer-legend-item ${isSelected ? 'active' : 'inactive'}`}
                onClick={() => toggleCategory(it.name)}
                style={{ cursor: 'pointer' }}
              >
                <span className={`footer-legend-color ${it.colorClass}`} />
                <span className="footer-legend-label">{it.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}
