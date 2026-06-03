import React, { useState } from "react";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import MultiStepForm from "../../components/Form/MultiStepForm";
import "./Manutenzione.css";

const Manutenzione = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // dati fittizi form
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
  ];

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleFormComplete = (formData) => {
    console.log("Form Manutenzione Completato:", formData);
    alert("Prenotazione Manutenzione Inviata!");
    setIsModalOpen(false);
  };

  return (
    <div className="manutenzione-page">
      <div className="page-header">
        <h1>Gestione Manutenzione</h1>
        <p>Monitora e prenota gli interventi per la flotta.</p>
      </div>

      <div className="buttons-container">
        <button className="btn-action" onClick={handleOpenModal}>
          Prenotazione Manutenzione
        </button>
        <button className="btn-action">Prenotazione Pulizie</button>
        <button className="btn-action">Storico Manutenzioni</button>
      </div>

      <div className="table-section">
        <Table headers={headers} data={data} />
      </div>

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
    </div>
  );
};

export default Manutenzione;
