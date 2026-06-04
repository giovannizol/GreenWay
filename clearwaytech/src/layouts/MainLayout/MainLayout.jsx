import React from 'react'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { Header } from '../../components/Header/Header'
import './MainLayout.css'

export function MainLayout({ section, onSelectSection, children }) {
  return (
    <div className="main-layout">
      <Sidebar selectedItem={section} onSelectItem={onSelectSection} />
      <div className="layout-body">
        <Header />
        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  )
}
