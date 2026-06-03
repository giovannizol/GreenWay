"use client"

import React from 'react'
import './Dashboard.css'
import { StatCard } from '../../components/StatCard/StatCard'
import { MapSection } from '../../components/MapSection/MapSection'
import { NotificationPanel } from '../../components/NotificationPanel/NotificationPanel'
import { VehicleChart } from '../../components/VehicleChart/VehicleChart'
import { AssistanceChart } from '../../components/AssistanceChart/AssistanceChart'

export default function Dashboard() {
  const stats = [
    { title: "Stazioni attive", value: "245", change: "-8%", changeType: "negative", progress: 75, color: "#14b8a6" },
    { title: "Flotta immobilizzata", value: "177", change: "+2%", changeType: "positive", progress: 60, color: "#3b82f6" },
    { title: "Clienti Attivi", value: "55", change: "-20%", changeType: "negative", progress: 45, color: "#f97316" },
    { title: "Risparmio CO2", value: "148", change: "+22%", changeType: "positive", progress: 80, color: "#22c55e" },
  ]

  return (
    <div className="dashboard-layout">
      {/* Colonna Sinistra: Stats, Grafici, Mappa */}
      <div className="dashboard-main-area">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        <div className="charts-grid">
          <VehicleChart />
          <AssistanceChart />
        </div>

        <div className="map-section-container">
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