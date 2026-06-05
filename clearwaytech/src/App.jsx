import { useState } from 'react'
import GestioneTicket from './pages/gestioneticket/gestioneTicket'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout/MainLayout";
import Manutenzione from "./pages/manutenzione/Manutenzione";
import { AuthProvider } from "./context/AuthProvider";
import { useAuth } from "./context/useAuth";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/login";
import GestioneVeicoliStazioni from './pages/gestioneveicolistazioni/GestioneVeicoliStazioni';
function AppContent() {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

//  const content = section === 'Gestione Ticket' ? <GestioneTicket /> : <Dashboard />

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/manutenzione" element={<Manutenzione />} />
          <Route path="/ticket" element={<GestioneTicket />} />
          <Route path="/flotta" element={<GestioneVeicoliStazioni />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

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
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
