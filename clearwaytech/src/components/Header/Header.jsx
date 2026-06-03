import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../context/useAuth'
import "./Header.css"

export function Header() {
  const { user, logout, roleLabel } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const dropdownRef = useRef(null)
  const initials = user ? `${user.nome?.[0] ?? ''}${user.cognome?.[0] ?? ''}`.toUpperCase() : 'GW'

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const toggleMenu = () => setMenuOpen((prev) => !prev)

  return (
    <header className="header">
      <div className="header-left">
        {/* <div className="search-container">
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
        </div> */}
      </div>
      
      <div className="header-right">
        <button className="icon-button">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
          </svg>
          <span className="notification-dot"></span>
        </button>
        
        <div className="user-profile" ref={dropdownRef}>
          <div className="user-info">
            <span className="user-name">{user ? `${user.nome} ${user.cognome}` : 'Ospite'}</span>
            <span className="user-role">{user ? roleLabel : 'Nessun ruolo'}</span>
          </div>
          <button className="user-avatar" type="button" onClick={toggleMenu}>{initials}</button>

          {menuOpen && (
            <div className="profile-menu">
              <button className="profile-menu-item" type="button" onClick={() => setMenuOpen(false)}>
                Settings
              </button>
              <button className="profile-menu-item" type="button" onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
