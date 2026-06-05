import { useState } from "react"
import "./MapLegend.css"

export default function MapLegend({ items = [], selectedItems = [], onToggle }) {
  const [open, setOpen] = useState(true)

  return (
    <div className={`map-legend ${open ? 'expanded' : 'collapsed'}`} aria-hidden={!open}>
      <button
        className="map-legend-toggle"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-label={open ? 'Riduci legenda' : 'Espandi legenda'}
      >
        {open ? '−' : '+'}
      </button>

      <div className="map-legend-inner">
        <div className="map-legend-title">Legenda</div>
        <ul className="map-legend-list">
          {items.map((it, idx) => {
            const isSelected = selectedItems.includes(it.name);
            return (
              <li 
                key={idx} 
                className={`legend-item ${isSelected ? 'active' : 'inactive'}`}
                onClick={() => onToggle && onToggle(it.name)}
                style={{ cursor: 'pointer' }}
              >
                <span className={`legend-color ${it.colorClass}`} />
                <span className="legend-label">{it.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  )
}
