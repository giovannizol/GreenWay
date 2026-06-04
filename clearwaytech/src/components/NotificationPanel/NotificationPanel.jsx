"use client"

import "./NotificationPanel.css"

export function NotificationPanel() {
  const notifications = Array(8).fill({
    title: "Noleggio Iniziato",
    desc: "Veicolo EV05 noleggiato",
    time: "2 min fa",
  })

  const activities = Array(8).fill({
    title: "Noleggio Iniziato",
    desc: "Veicolo EV05 rientrato",
    time: "2 min fa",
  })

  return (
    <div className="side-panel">
      <div className="panel-section">
        <div className="section-header">
          <h3 className="section-title">NOTIFICHE</h3>
          <button className="see-all">Vedi Tutto</button>
        </div>
        <div className="item-list">
          {notifications.map((item, i) => (
            <div key={i} className="list-item">
              <div className="item-icon-box">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18.5" cy="17.5" r="3.5" /><circle cx="5.5" cy="17.5" r="3.5" /><circle cx="15" cy="5" r="1" /><path d="M12 17.5V14l-3-3 4-3 2 3h2" /></svg>
              </div>
              <div className="item-content">
                <p className="item-title">{item.title}</p>
                <p className="item-desc">{item.desc}</p>
              </div>
              <span className="item-time">{item.time}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="panel-section">
        <div className="section-header">
          <h3 className="section-title">ATTIVITÀ RECENTI</h3>
          <button className="see-all">Vedi Tutto</button>
        </div>
        <div className="item-list">
          {activities.map((item, i) => (
            <div key={i} className="list-item">
              <div className="item-icon-box">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="18.5" cy="17.5" r="3.5" /><circle cx="5.5" cy="17.5" r="3.5" /><circle cx="15" cy="5" r="1" /><path d="M12 17.5V14l-3-3 4-3 2 3h2" /></svg>
              </div>
              <div className="item-content">
                <p className="item-title">{item.title}</p>
                <p className="item-desc">{item.desc}</p>
              </div>
              <span className="item-time">{item.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
