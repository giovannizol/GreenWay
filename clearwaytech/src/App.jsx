import { MainLayout } from "./layouts/MainLayout/MainLayout";
import Manutenzione from "./pages/manutenzione/Manutenzione";
import { AuthProvider } from './context/AuthProvider'
import { useAuth } from './context/useAuth'
import { MainLayout } from './layouts/MainLayout'
import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/login/login'

function AppContent() {
  const { user } = useAuth()

  if (!user) {
    return <Login />
  }

  return (
    <MainLayout>
      <Dashboard />
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
