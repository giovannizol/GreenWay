import React, { useState } from "react";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import MultiStepForm from "../../components/Form/MultiStepForm";
import "./Manutenzione.css";

const Manutenzione = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCleaningModalOpen, setIsCleaningModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState("default");

  // dati fittizi form manutenzione
  const maintenanceSteps = [
    {
      title: "Veicolo",
      fields: [
        { name: "targa", label: "Targa Veicolo", placeholder: "es. AA123BB" },
        { name: "modello", label: "Modello", placeholder: "es. Iveco Daily" },
        { name: "km", label: "Km Attuali", type: "number" },
        {
          name: "alimentazione",
          label: "Alimentazione",
          type: "select",
          options: [
            { label: "Diesel", value: "diesel" },
            { label: "Benzina", value: "benzina" },
            { label: "Elettrico", value: "elettrico" },
          ],
        },
      ],
    },
    {
      title: "Diagnostica",
      fields: [
        {
          name: "tipo",
          label: "Tipo Intervento",
          type: "select",
          options: [
            { label: "Tagliando", value: "tagliando" },
            { label: "Riparazione", value: "riparazione" },
            { label: "Cambio Gomme", value: "gomme" },
          ],
        },
        {
          name: "priorita",
          label: "Priorità",
          type: "select",
          options: [
            { label: "Bassa", value: "bassa" },
            { label: "Media", value: "media" },
            { label: "Alta", value: "alta" },
          ],
        },
        {
          name: "descrizione",
          label: "Descrizione Problema",
          type: "textarea",
          fullWidth: true,
        },
      ],
    },
    {
      title: "Destinatario",
      fields: [
        { name: "officina", label: "Officina", placeholder: "Nome Officina" },
        { name: "data", label: "Data Preferita", type: "date" },
        {
          name: "tecnico",
          label: "Tecnico Referente",
          placeholder: "Nome Tecnico",
        },
      ],
    },
  ];

  // dati fittizi form pulizie
  const cleaningSteps = [
    {
      title: "Dettagli Pulizia",
      fields: [
        {
          name: "veicolo_pulizia",
          label: "Veicolo",
          placeholder: "es. Iveco Daily",
        },
        { name: "targa_pulizia", label: "Targa", placeholder: "es. AA123BB" },
        {
          name: "tipo_pulizia",
          label: "Tipo di Lavaggio",
          type: "select",
          options: [
            { label: "Interno", value: "interno" },
            { label: "Esterno", value: "esterno" },
            { label: "Completo (Sanificazione)", value: "completo" },
          ],
        },
        {
          name: "luogo",
          label: "Punto di Lavaggio",
          type: "select",
          options: [
            { label: "Sede Centrale", value: "sede" },
            { label: "Autolavaggio Convenzionato", value: "esterno" },
          ],
        },
        { name: "data_pulizia", label: "Data Richiesta", type: "date" },
        {
          name: "note_pulizia",
          label: "Note Aggiuntive",
          type: "textarea",
          fullWidth: true,
        },
      ],
    },
  ];

  // Campi fittizi per tabella Default
  const defaultHeaders = [
    { key: "id", label: "ID" },
    { key: "veicolo", label: "Veicolo" },
    { key: "tipo", label: "Tipo Intervento" },
    { key: "data", label: "Data" },
    { key: "stato", label: "Stato" },
  ];

  const defaultData = [
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
  ];

  // Campi fittizi per tabella Storico
  const historyHeaders = [
    { key: "id", label: "ID" },
    { key: "veicolo", label: "Veicolo" },
    { key: "intervento", label: "Dettaglio" },
    { key: "costo", label: "Costo (€)" },
    { key: "data_chiusura", label: "Completato il" },
  ];

  const historyData = [
    {
      id: "H001",
      veicolo: "Iveco Daily",
      intervento: "Cambio Olio",
      costo: "150",
      data_chiusura: "10/05/2026",
    },
    {
      id: "H002",
      veicolo: "Fiat Panda",
      intervento: "Sostituzione Freni",
      costo: "280",
      data_chiusura: "15/05/2026",
    },
    {
      id: "H003",
      veicolo: "Mercedes Sprinter",
      intervento: "Revisione",
      costo: "80",
      data_chiusura: "20/05/2026",
    },
  ];

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenCleaningModal = () => setIsCleaningModalOpen(true);
  const handleCloseCleaningModal = () => setIsCleaningModalOpen(false);

  const handleFormComplete = (formData) => {
    console.log("Form Manutenzione Completato:", formData);
    alert("Prenotazione Manutenzione Inviata!");
    setIsModalOpen(false);
  };

  const handleCleaningFormComplete = (formData) => {
    console.log("Form Pulizie Completato:", formData);
    alert("Prenotazione Pulizie Inviata");
    setIsCleaningModalOpen(false);
  };

  return (
    <div className="manutenzione-page">
      <div className="page-header">
        <h1>Gestione Manutenzione</h1>
        <p>
          {currentView === "history"
            ? "Consulta lo storico degli interventi passati."
            : "Monitora e prenota gli interventi per la flotta."}
        </p>
      </div>

      <div className="buttons-container">
        <button
          className="btn-action"
          onClick={() => {
            setCurrentView("default");
            handleOpenModal();
          }}
        >
          Prenotazione Manutenzione
        </button>
        <button
          className="btn-action"
          onClick={() => {
            setCurrentView("default");
            handleOpenCleaningModal();
          }}
        >
          Prenotazione Pulizie
        </button>
        <button
          className={`btn-action ${currentView === "history" ? "active-view" : ""}`}
          onClick={() =>
            setCurrentView(currentView === "history" ? "default" : "history")
          }
        >
          {currentView === "history"
            ? "Visualizza Interventi Programmati"
            : "Visualizza Storico Manutenzioni"}
        </button>
      </div>

      <div className="table-section">
        <h2 style={{ marginBottom: "15px", color: "var(--color-text-main)" }}>
          {currentView === "history"
            ? "Storico Interventi"
            : "Interventi Programmati"}
        </h2>
        <Table
          headers={currentView === "history" ? historyHeaders : defaultHeaders}
          data={currentView === "history" ? historyData : defaultData}
        />
      </div>

      {/* Modale Manutenzione */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div style={{ padding: "20px" }}>
          <h2 style={{ color: "var(--color-primary)", marginBottom: "20px" }}>
            Prenota la Manutenzione
          </h2>
          <MultiStepForm
            steps={maintenanceSteps}
            onComplete={handleFormComplete}
          />
        </div>
      </Modal>

      {/* Modale Pulizie */}
      <Modal isOpen={isCleaningModalOpen} onClose={handleCloseCleaningModal}>
        <div style={{ padding: "20px" }}>
          <h2 style={{ color: "var(--color-primary)", marginBottom: "20px" }}>
            Prenota Pulizia Veicolo
          </h2>
          <MultiStepForm
            steps={cleaningSteps}
            onComplete={handleCleaningFormComplete}
          />
        </div>
      </Modal>
    </div>
  );
};

export default Manutenzione;
