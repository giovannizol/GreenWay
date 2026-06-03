"use client"

import React from 'react'
import { Sidebar } from '../components/Sidebar/Sidebar'
import { Header } from '../components/Header/Header'
import './MainLayout.css'

export function MainLayout({ children, activeItem, setActiveItem }) {
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