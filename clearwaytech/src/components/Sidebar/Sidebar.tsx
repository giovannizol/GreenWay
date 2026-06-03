"use client"

import { useState } from "react"
import "./Sidebar.css"

const menuItems = [
  "Dashboard",
  "Monitoraggio e Analisi",
  "Manutenzioni",
  "Gestione Flotta e Stazioni",
  "Amministrazione",
  "Calendario",
  "Gestione Ticket",
]

export function Sidebar() {
  const [activeItem, setActiveItem] = useState("Dashboard")

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-logo">GreenWay</h1>
      </div>
      
      <div className="sidebar-label">Menu Principale</div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => setActiveItem(item)}
            className={`nav-item ${activeItem === item ? "active" : ""}`}
          >
            {item}
          </button>
        ))}
      </nav>
    </aside>
  )
}
