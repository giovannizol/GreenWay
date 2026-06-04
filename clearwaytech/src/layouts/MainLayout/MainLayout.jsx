import React from "react";
import { Sidebar } from "../components/Sidebar/Sidebar";
import { Header } from "../components/Header/Header";
import { NotificationPanel } from "../components/NotificationPanel/NotificationPanel";
import "./MainLayout.css";

export function MainLayout({ section, onSelectSection, children }) {
  return (
    <div className="main-layout">
      <Sidebar selectedItem={section} onSelectItem={onSelectSection} />
      <div className="layout-body">
        <Header />
        <div className="layout-container">
          <main className="layout-content">{children}</main>
          <aside className="layout-notifications">
            <NotificationPanel />
          </aside>
        </div>
      </div>
    </div>
  );
}
