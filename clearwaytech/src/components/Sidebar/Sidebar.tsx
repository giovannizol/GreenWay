"use client"

import { useState } from "react"
import { useAuth } from '../../context/useAuth'
import "./Sidebar.css"

export function Sidebar() {
  const { menuItems } = useAuth()
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
