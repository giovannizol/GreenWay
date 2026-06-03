import React from 'react'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { Header } from '../components/Header/Header'
import './MainLayout.css'

interface MainLayoutProps {
  children: React.ReactNode
  activeItem: string
  setActiveItem: (item: string) => void
}

export function MainLayout({ children, activeItem, setActiveItem }: MainLayoutProps) {
  return (
    <div className="main-layout">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="layout-body">
        <Header />
        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  )
}
