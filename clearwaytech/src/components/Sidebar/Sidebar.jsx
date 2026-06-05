import { NavLink } from "react-router-dom"
import "./Sidebar.css"

const menuItems = [
  { name: "Dashboard", path: "/" },
  { name: "Monitoraggio e Analisi", path: "/monitoraggio" },
  { name: "Manutenzioni", path: "/manutenzione" },
  { name: "Gestione Flotta, Stazioni e Utenti", path: "/flotta" },
  // { name: "Amministrazione", path: "/amministrazione" },
  // { name: "Calendario", path: "/calendario" },
  { name: "Gestione Ticket", path: "/ticket" },
]

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1 className="sidebar-logo">GreenWay</h1>
      </div>
      
      <div className="sidebar-label">Menu Principale</div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
