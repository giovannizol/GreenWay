import { AuthProvider } from './context/AuthProvider';
import { useAuth } from './context/useAuth';
import { MainLayout } from './layouts/MainLayout/MainLayout';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/login';
import GestioneFlotta from './pages/monitoraggio-e-analisi/GestioneFlotta';

function AppContent() {
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Rotta per gestire il click sulla voce 'Monitoraggio e Analisi' della sidebar */}
          <Route path="/monitoraggio" element={<GestioneFlotta />} />
          {/* Rotta per gestire il click sulla voce 'Gestione Flotta e Stazioni' */}
          <Route path="/gestione-flotta" element={<GestioneFlotta />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;