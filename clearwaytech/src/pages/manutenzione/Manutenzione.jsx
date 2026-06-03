import React from "react";
import Table from "../../components/Table/Table";
import "./Manutenzione.css";

const Manutenzione = () => {
  // Campi fittizi per tabella
  const headers = [
    { key: "id", label: "ID" },
    { key: "veicolo", label: "Veicolo" },
    { key: "tipo", label: "Tipo Intervento" },
    { key: "data", label: "Data" },
    { key: "stato", label: "Stato" },
  ];

  // Dati fittizi della tabella
  const data = [
    {
      id: "001",
      veicolo: "Iveco Daily",
      tipo: "Manutenzione",
      data: "05/06/2026",
      stato: "In corso",
    },
    {
      id: "002",
      veicolo: "Renault Kangoo",
      tipo: "Pulizia",
      data: "06/06/2026",
      stato: "Programmato",
    },
    {
      id: "003",
      veicolo: "Fiat Ducato",
      tipo: "Manutenzione",
      data: "04/06/2026",
      stato: "Completato",
    },
    {
      id: "004",
      veicolo: "Fiat Ducato",
      tipo: "Manutenzione",
      data: "04/06/2026",
      stato: "Completato",
    },
    {
      id: "005",
      veicolo: "Fiat Ducato",
      tipo: "Manutenzione",
      data: "04/06/2026",
      stato: "Completato",
    },
    {
      id: "006",
      veicolo: "Fiat Ducato",
      tipo: "Manutenzione",
      data: "04/06/2026",
      stato: "Completato",
    },
  ];

  return (
    <div className="manutenzione-page">
      <div className="page-header">
        <h1>Gestione Manutenzione</h1>
        <p>Monitora e prenota gli interventi per la flotta.</p>
      </div>

      <div className="buttons-container">
        <button className="btn-action">Prenotazione Manutenzione</button>
        <button className="btn-action">Prenotazione Pulizie</button>
        <button className="btn-action">Storico Manutenzioni</button>
      </div>

      <div className="table-section">
        <Table headers={headers} data={data} />
      </div>
    </div>
  );
};

export default Manutenzione;
