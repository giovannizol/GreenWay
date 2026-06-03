"use client"

import { useAuth } from '../../context/useAuth'
import "./Header.css"

export function Header() {
  const { user, logout, roleLabel } = useAuth()
  const initials = user ? `${user.nome?.[0] ?? ''}${user.cognome?.[0] ?? ''}`.toUpperCase() : 'GW'

  return (
    <header className="header">
      <div className="header-left">
        <div className="search-container">
          <span className="search-icon"></span>
        </div>
      </div>
      
      <div className="header-right">
        {user && (
          <button className="icon-button logout-button" onClick={logout}>
            Esci
          </button>
        )}

        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">{user ? `${user.nome} ${user.cognome}` : 'Ospite'}</span>
            <span className="user-role">{user ? roleLabel : 'Nessun ruolo'}</span>
          </div>
          <div className="user-avatar">{initials}</div>
        </div>
      </div>
    </header>
  )
}
