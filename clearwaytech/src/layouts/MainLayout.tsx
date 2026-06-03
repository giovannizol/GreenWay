import React from 'react'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { Header } from '../components/Header/Header'
import './MainLayout.css'

interface MainLayoutProps {
  children: React.ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="layout-body">
        <Header />
        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  )
}
