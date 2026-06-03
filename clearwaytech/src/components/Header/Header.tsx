"use client"

import { useAuth } from '../../context/useAuth'
import { useEffect, useRef, useState } from 'react'
import "./Header.css"

export function Header() {
  const { user, logout, roleLabel } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement | null>(null)
  const initials = user ? `${user.nome?.[0] ?? ''}${user.cognome?.[0] ?? ''}`.toUpperCase() : 'GW'

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
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
        <div className="search-container">
          <span className="search-icon"></span>
        </div>
      </div>
      
      <div className="header-right">
        <div className="user-profile" ref={dropdownRef}>
          <div className="user-info">
            <span className="user-name">{user ? `${user.nome} ${user.cognome}` : 'Ospite'}</span>
            <span className="user-role">{user ? roleLabel : 'Nessun ruolo'}</span>
          </div>

          <button className="user-avatar" type="button" onClick={toggleMenu}>
            {initials}
          </button>

          {menuOpen && (
            <div className="profile-menu">
              <button className="profile-menu-item" type="button" onClick={() => {
                setMenuOpen(false)
                // TODO: implement settings page navigation if needed
              }}>
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
