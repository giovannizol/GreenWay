"use client"

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts'
import "./AssistanceChart.css"

const data = [
  { name: 'Lun', customers: 8, color: '#14b8a6' },
  { name: 'Mar', customers: 12, color: '#14b8a6' },
  { name: 'Mer', customers: 18, color: '#14b8a6' },
  { name: 'Gio', customers: 24, color: '#14b8a6' },
  { name: 'Ven', customers: 30, color: '#22c55e' },
  { name: 'Sab', customers: 35, color: '#22c55e' },
  { name: 'Dom', customers: 32, color: '#22c55e' },
]

export function AssistanceChart() {
  return (
    <div className="chart-card">
      <div className="chart-header">
        <h3>Crescita clienti</h3>
        <span className="chart-subtitle">Nuovi clienti settimana</span>
      </div>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
            />
            <Tooltip
              cursor={{ fill: '#f8fafc' }}
              formatter={(value) => [`${value} clienti`, 'Nuovi clienti']}
              contentStyle={{
                borderRadius: '8px',
                border: 'none',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                fontSize: '12px',
              }}
            />
            <Bar dataKey="customers" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
