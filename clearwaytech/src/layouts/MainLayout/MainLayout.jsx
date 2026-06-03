import { Sidebar } from "../../components/Sidebar/Sidebar"
import { Header } from "../../components/Header/Header"
import "./MainLayout.css"

export function MainLayout({ }) {
  return (
    <div className="main-layout">
      <Sidebar />
      <div className="layout-body">
        <Header />
        <main className="layout-content">
        </main>
      </div>
    </div>
  )
}
