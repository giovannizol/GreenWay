import { useState } from 'react';
import { StatCard } from '../../components/StatCard/StatCard';
import Table from '../../components/Table/Table';
import './GestioneFlotta.css';

export default function GestioneFlotta() {
  const [activeTab, setActiveTab] = useState('stato'); 

  // Dati fittizi per la tabella dei veicoli
  const veicoliRaw = [
    { id: 'EV-05', modello: 'EVOS Berlina', batteria: 84, stato: 'Disponibile', hub: 'Stazione Centrale' },
    { id: 'EV-02', modello: 'EVOS Van', batteria: 12, stato: 'In Carica', hub: 'Hub Ovest' },
    { id: 'EV-09', modello: 'EVOS Berlina', batteria: 95, stato: 'In Uso', hub: 'Hub Nord' },
    { id: 'EV-14', modello: 'EVOS City', batteria: 45, stato: 'Manutenzione', hub: 'Officina Centrale' },
  ];

  const headers = [
    { key: 'id', label: 'ID Veicolo' },
    { key: 'modello', label: 'Modello' },
    { key: 'batteriaComp', label: 'Livello Batteria' },
    { key: 'statoComp', label: 'Stato attuale' },
    { key: 'hub', label: 'Hub / Posizione' },
    { key: 'azioni', label: 'Azioni' },
  ];

  const veicoli = veicoliRaw.map(v => ({
    ...v,
    batteriaComp: (
      <div className="battery-container">
        <span className="battery-text">{v.batteria}%</span>
        <div className="battery-bar-bg">
          <div 
            className={`battery-bar-fill ${v.batteria < 20 ? 'low' : ''}`} 
            style={{ width: `${v.batteria}%` }}
          ></div>
        </div>
      </div>
    ),
    statoComp: (
      <span className={`status-badge ${v.stato.toLowerCase().replace(' ', '-')}`}>
        {v.stato}
      </span>
    ),
    azioni: (
      <button className="action-btn-small">Gestisci</button>
    )
  }));

  const stats = [
    { title: 'Veicoli Totali', value: '142', change: '+5%', changeType: 'positive', progress: 75, color: '#14b8a6' },
    { title: 'Hub Ricarica', value: '12', change: '85% occ.', changeType: 'positive', progress: 85, color: '#3b82f6' },
    { title: 'In Manutenzione', value: '8', change: '+2 oggi', changeType: 'negative', progress: 15, color: '#f97316' },
  ];

  return (
    <div className="gestione-page flotta-page">
      {/* HEADER INTERNO */}
      <div className="page-header">
        <h1>Monitoraggio e Analisi</h1>
        <p>Analisi delle performance della flotta e stato dei veicoli in tempo reale.</p>
      </div>

      {/* SOTTO-TAB (Stile Manutenzione) */}
      <div className="buttons-container">
        <button 
          className={`btn-action ${activeTab === 'stato' ? 'active' : ''}`}
          onClick={() => setActiveTab('stato')}
        >
          Stato Veicoli
        </button>
        <button 
          className={`btn-action ${activeTab === 'mappa' ? 'active' : ''}`}
          onClick={() => setActiveTab('mappa')}
        >
          Mappa Stazioni / Hub
        </button>
        <button 
          className={`btn-action ${activeTab === 'aggiungi' ? 'active' : ''}`}
          onClick={() => setActiveTab('aggiungi')}
        >
          Aggiungi Nuovo Veicolo
        </button>
      </div>

      {/* CONTENUTO DINAMICO IN BASE AL TAB */}
      {activeTab === 'stato' && (
        <div className="flotta-content">
          
          <div className="stats-grid">
            {stats.map((stat, idx) => (
              <StatCard key={idx} {...stat} />
            ))}
          </div>

          <div className="table-section">
            <h3 className="section-title">Anagrafica e Stato Flotta</h3>
            <Table headers={headers} data={veicoli} />
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