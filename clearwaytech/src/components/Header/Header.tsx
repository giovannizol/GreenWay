"use client"

import "./Header.css"

export function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <div className="search-container">
          <span className="search-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </span>
          <input 
            type="text" 
            placeholder="Cerca per targa, stazione o ticket..." 
            className="search-input"
          />
        </div>
      </div>
      
      <div className="header-right">
        <button className="icon-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span className="notification-dot"></span>
        </button>
        
        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">Admin ClearWay</span>
            <span className="user-role">Gestore Flotta</span>
          </div>
          <div className="user-avatar">AD</div>
        </div>
      </div>
    </header>
  )
}
