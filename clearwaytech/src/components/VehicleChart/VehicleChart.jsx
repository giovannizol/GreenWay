"use client"

import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import "./VehicleChart.css"

const data = [
  { name: 'Lun', revenue: 12200 },
  { name: 'Mar', revenue: 13800 },
  { name: 'Mer', revenue: 15400 },
  { name: 'Gio', revenue: 17100 },
  { name: 'Ven', revenue: 18300 },
  { name: 'Sab', revenue: 20400 },
  { name: 'Dom', revenue: 19500 },
]

export function VehicleChart() {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Ricavi settimanali</h3>
        <span className="chart-subtitle">Entrate degli ultimi 7 giorni</span>
      </div>
      <div className="chart-wrapper pie-chart-container">
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#94a3b8', fontSize: 12 }}
              tickFormatter={(value) => `€${value / 1000}k`}
            />
            <Tooltip
              cursor={{ stroke: '#e2e8f0', strokeWidth: 2, fill: 'transparent' }}
              formatter={(value) => [`€${value.toLocaleString()}`, 'Ricavi']}
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                fontSize: '12px',
              }}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#14b8a6"
              strokeWidth={3}
              dot={{ r: 4, fill: '#14b8a6' }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}