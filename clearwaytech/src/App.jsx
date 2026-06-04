import { useState } from 'react'
import { AuthProvider } from './context/AuthProvider'
import { useAuth } from './context/useAuth'
import { MainLayout } from './layouts/MainLayout'
import Dashboard from './pages/dashboard/Dashboard'
import GestioneTicket from './pages/gestioneticket/gestioneTicket'
import Login from './pages/login/login'

function AppContent() {
  const { user } = useAuth()
  const [section, setSection] = useState('Dashboard')

  if (!user) {
    return <Login />
  }

  const content = section === 'Gestione Ticket' ? <GestioneTicket /> : <Dashboard />

  return (
    <MainLayout section={section} onSelectSection={setSection}>
      {content}
    </MainLayout>
  )
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
