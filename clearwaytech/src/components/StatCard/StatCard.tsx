"use client"

import "./StatCard.css"

interface StatCardProps {
  title: string
  value: string
  change: string
  changeType: 'positive' | 'negative'
  progress: number
  color: string
}

export function StatCard({ title, value, change, changeType, progress, color }: StatCardProps) {
  return (
    <div className="stat-card">
      <div className="stat-info">
        <span className="stat-title">{title}</span>
        <div className="stat-value-container">
          <h2 className="stat-value">{value}</h2>
          <span className={`stat-change ${changeType}`}>
            {change}
          </span>
        </div>
      </div>
      
      <div className="stat-progress-container">
        <div className="stat-progress-bar">
          <div 
            className="stat-progress-fill" 
            style={{ width: `${progress}%`, backgroundColor: color }}
          ></div>
        </div>
        <span className="stat-progress-label">{progress}% del target</span>
      </div>
    </div>
  )
}
