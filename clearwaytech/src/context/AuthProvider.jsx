import { useMemo, useState } from 'react'
import { AuthContext } from './AuthContext'
import utentiData from '../data/utenti.json'

const roleMenuMap = {
  admin: [
    'Dashboard',
    'Monitoraggio e Analisi',
    'Manutenzioni',
    'Gestione Flotta e Stazioni',
    'Amministrazione',
    'Calendario',
    'Gestione Ticket',
  ],
  supporto: [
    'Dashboard',
    'Monitoraggio e Analisi',
    'Manutenzioni',
    'Gestione Ticket',
  ],
  tecnico: [
    'Dashboard',
    'Monitoraggio e Analisi',
    'Manutenzioni',
    'Gestione Flotta e Stazioni',
  ],
}

const roleLabelMap = {
  admin: 'Amministratore',
  supporto: 'Supporto',
  tecnico: 'Tecnico',
}

export function AuthProvider({ children }) {
  /** @type {import('./AuthContext').User | null} */
  const [user, setUser] = useState(null)

  const login = (email, password) => {
    const currentUser = utentiData.find(
      (userItem) => userItem.email.toLowerCase() === email.toLowerCase()
    )

    if (!currentUser) {
      return { success: false, message: 'Nessun utente trovato con questa email.' }
    }

    if (!currentUser.attivo) {
      return { success: false, message: 'Utente non attivo.' }
    }

    if (currentUser.password !== password) {
      return { success: false, message: 'Password errata.' }
    }

    setUser(currentUser)
    return { success: true, user: currentUser }
  }

  const logout = () => {
    setUser(null)
  }

  const menuItems = useMemo(() => {
    if (!user) return []
    return roleMenuMap[user.role] ?? ['Dashboard']
  }, [user])

  const roleLabel = useMemo(() => {
    if (!user) return ''
    return roleLabelMap[user.role] ?? user.role
  }, [user])

  return (
    <AuthContext.Provider value={{ user, login, logout, menuItems, roleLabel }}>
      {children}
    </AuthContext.Provider>
  )
}
