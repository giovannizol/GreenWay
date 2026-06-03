import './Dashboard.css'
import { useAuth } from '../../context/useAuth'
import { StatCard } from '../../components/StatCard/StatCard'
import { MapSection } from '../../components/MapSection/MapSection'
import { NotificationPanel } from '../../components/NotificationPanel/NotificationPanel'
import { VehicleChart } from '../../components/VehicleChart/VehicleChart'
import { AssistanceChart } from '../../components/AssistanceChart/AssistanceChart'

export default function Dashboard() {
  const { user } = useAuth()
  const role = user?.role?.toString().trim().toLowerCase()
  const isTecnico = role === 'tecnico'
  const isSupporto = role === 'supporto'
  const isCompactView = isTecnico || isSupporto

  const adminStats = [
    { title: 'Stazioni attive', value: '245', change: '-8%', changeType: 'negative', progress: 75, color: '#14b8a6' },
    { title: 'Flotta immobilizzata', value: '177', change: '+2%', changeType: 'positive', progress: 60, color: '#3b82f6' },
    { title: 'Clienti Attivi', value: '55', change: '-20%', changeType: 'negative', progress: 45, color: '#f97316' },
    { title: 'Risparmio CO2', value: '148', change: '+22%', changeType: 'positive', progress: 80, color: '#22c55e' },
  ]

  const tecnicoStats = [
    { title: 'Manutenzioni attive in esecuzione', value: '12', change: '+5%', changeType: 'positive', progress: 70, color: '#f59e0b' },
    { title: 'Veicoli guasti', value: '8', change: '+1%', changeType: 'negative', progress: 40, color: '#ef4444' },
    { title: 'Stazioni fuori uso', value: '5', change: '+10%', changeType: 'negative', progress: 55, color: '#dc2626' },
  ]

  const supportoStats = [
    { title: 'Segnalazioni', value: '22', change: '+12%', changeType: 'positive', progress: 64, color: '#2563eb' },
    { title: 'Noleggi attivi', value: '34', change: '+3%', changeType: 'positive', progress: 52, color: '#14b8a6' },
    { title: 'Ticket non chiusi', value: '9', change: '+8%', changeType: 'negative', progress: 38, color: '#f97316' },
  ]

  const stats = isTecnico ? tecnicoStats : isSupporto ? supportoStats : adminStats

  return (
    <div className="dashboard-layout">
      {/* Colonna Sinistra: Stats, Grafici, Mappa */}
      <div className="dashboard-main-area">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {!isCompactView && (
          <div className="charts-grid">
            <VehicleChart />
            <AssistanceChart />
          </div>
        )}

        <div className={`map-section-container${isTecnico ? ' tecnico' : isSupporto ? ' supporto' : ''}`}>
          <MapSection />
        </div>
      </div>

      {/* Colonna Destra: Notifiche (Spanna tutta l'altezza) */}
      <aside className="dashboard-sidebar-area">
        <NotificationPanel />
      </aside>
    </div>
  )
}
