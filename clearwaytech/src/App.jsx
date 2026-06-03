import { useState } from "react"
import { MainLayout } from "./layouts/MainLayout"
import Dashboard from './pages/dashboard/Dashboard'
import GestioneVeicoliStazioni from './pages/gestioneveicolistazioni/GestioneVeicoliStazioni'

function App() {
  const [activeItem, setActiveItem] = useState("Dashboard")

  const renderPage = () => {
    switch (activeItem) {
      case "Dashboard":
        return <Dashboard />
      case "Gestione Flotta e Stazioni":
        return <GestioneVeicoliStazioni />
      default:
        return <Dashboard />
    }
  }

  return (
    <MainLayout activeItem={activeItem} setActiveItem={setActiveItem}>
      {renderPage()}
    </MainLayout>
  )
}

export default App
