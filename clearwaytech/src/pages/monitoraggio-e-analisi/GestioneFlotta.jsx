import { useState } from 'react';
import './GestioneFlotta.css';

export default function GestioneFlotta() {
  const [activeTab, setActiveTab] = useState('stato'); 

  // Dati fittizi per la tabella dei veicoli
  const veicoli = [
    { id: 'EV-05', modello: 'EVOS Berlina', batteria: 84, stato: 'Disponibile', hub: 'Stazione Centrale' },
    { id: 'EV-02', modello: 'EVOS Van', batteria: 12, stato: 'In Carica', hub: 'Hub Ovest' },
    { id: 'EV-09', modello: 'EVOS Berlina', batteria: 95, stato: 'In Uso', hub: 'Hub Nord' },
    { id: 'EV-14', modello: 'EVOS City', batteria: 45, stato: 'Manutenzione', hub: 'Officina Centrale' },
  ];

  return (
    <div className="flotta-container">
      {/* HEADER INTERNO */}
      <div className="flotta-header">
        <h1>Monitoraggio e Analisi</h1>
      </div>

      {/* SOTTO-TAB (Stile Manutenzione) */}
      <div className="flotta-tabs">
        <button 
          className={`tab-btn ${activeTab === 'stato' ? 'active' : ''}`}
          onClick={() => setActiveTab('stato')}
        >
          Stato Veicoli
        </button>
        <button 
          className={`tab-btn ${activeTab === 'mappa' ? 'active' : ''}`}
          onClick={() => setActiveTab('mappa')}
        >
          Mappa Stazioni / Hub
        </button>
        <button 
          className={`tab-btn ${activeTab === 'aggiungi' ? 'active' : ''}`}
          onClick={() => setActiveTab('aggiungi')}
        >
          Aggiungi Nuovo Veicolo
        </button>
      </div>

      {/* CONTENUTO DINAMICO IN BASE AL TAB */}
      {activeTab === 'stato' && (
        <div className="flotta-content">
          
          <div className="kpi-grid">
            <div className="kpi-card">
              <div className="kpi-info">
                <h3>Veicoli Totali</h3>
                <span className="kpi-number">142</span>
                <span className="kpi-trend positivo">+5% rispetto a ieri</span>
              </div>
              <div className="kpi-chart">
                <svg viewBox="0 0 36 36" className="circular-chart green">
                  <path className="circle-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path className="circle"
                    strokeDasharray="75, 100"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-info">
                <h3>Hub Ricarica</h3>
                <span className="kpi-number">12</span>
                <span className="kpi-trend positivo">85% occupati</span>
              </div>
              <div className="kpi-chart">
                <svg viewBox="0 0 36 36" className="circular-chart blue">
                  <path className="circle-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path className="circle"
                    strokeDasharray="85, 100"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>
            </div>

            <div className="kpi-card">
              <div className="kpi-info">
                <h3>In Manutenzione</h3>
                <span className="kpi-number">8</span>
                <span className="kpi-trend negativo">+2 veicoli ore fa</span>
              </div>
              <div className="kpi-chart">
                <svg viewBox="0 0 36 36" className="circular-chart orange">
                  <path className="circle-bg"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path className="circle"
                    strokeDasharray="15, 100"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="table-wrapper">
            <h3>Anagrafica e Stato Flotta</h3>
            <table className="flotta-table">
              <thead>
                <tr>
                  <th>ID Veicolo</th>
                  <th>Modello</th>
                  <th>Livello Batteria</th>
                  <th>Stato attuale</th>
                  <th>Hub / Posizione</th>
                  <th>Azioni</th>
                </tr>
              </thead>
              <tbody>
                {veicoli.map((veicolo) => (
                  <tr key={veicolo.id}>
                    <td><strong>{veicolo.id}</strong></td>
                    <td>{veicolo.modello}</td>
                    <td>
                      <div className="battery-container">
                        <span className="battery-text">{veicolo.batteria}%</span>
                        <div className="battery-bar-bg">
                          <div 
                            className={`battery-bar-fill ${veicolo.batteria < 20 ? 'low' : ''}`} 
                            style={{ width: `${veicolo.batteria}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className={`status-badge ${veicolo.stato.toLowerCase().replace(' ', '-')}`}>
                        {veicolo.stato}
                      </span>
                    </td>
                    <td>{veicolo.hub}</td>
                    <td>
                      <button className="action-btn">Gestisci</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'mappa' && (
        <div className="flotta-placeholder-box">
          <p>Mappa interattiva delle stazioni (In fase di implementazione...)</p>
        </div>
      )}




      {activeTab === 'aggiungi' && (
        <div className="form-wizard-container">
          <form className="wizard-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
              <div className="form-group">
                <label>Codice Veicolo</label>
                <input type="text" placeholder="Es. EV-22" />
              </div>
              <div className="form-group">
                <label>Anno Immatricolazione</label>
                <input type="text" placeholder="Es. 2024" />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="next-step-btn">Registra Veicolo</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}