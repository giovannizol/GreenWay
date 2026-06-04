import React, { useState } from "react";
import Table from "../../components/Table/Table";
import Modal from "../../components/Modal/Modal";
import MultiStepForm from "../../components/Form/MultiStepForm";
import "./Manutenzione.css";

const Manutenzione = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCleaningModalOpen, setIsCleaningModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [currentView, setCurrentView] = useState("default");
  const [statusFilter, setStatusFilter] = useState("Programmato");
  const [prefilledData, setPrefilledData] = useState({});

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
    { key: "id", label: "ID", width: "80px" },
    { key: "veicolo", label: "Veicolo", width: "200px" },
    { key: "tipo", label: "Tipo Intervento", width: "180px" },
    { key: "data", label: "Data", width: "120px" },
    { key: "stato", label: "Stato", width: "150px" },
  ];

  const defaultData = [
    {
      id: "001",
      veicolo: "Iveco Daily",
      tipo: "Manutenzione",
      data: "05/06/2026",
      stato: "In corso",
      tecnico: "Marco Bianchi",
      azienda: "AutoExpress",
      extra: { note: "Controllo freni e livelli." },
    },
    {
      id: "002",
      veicolo: "Renault Kangoo",
      tipo: "Pulizia",
      data: "06/06/2026",
      stato: "Programmato",
      extra: {
        luogo: "Sede Centrale",
        tipo_lavaggio: "Completo",
        note: "Richiesta sanificazione abitacolo.",
      },
    },
    {
      id: "003",
      veicolo: "Fiat Ducato",
      tipo: "Manutenzione",
      data: "04/06/2026",
      stato: "Completato",
      tecnico: "Luca Rossi",
      azienda: "General Motors",
      extra: { note: "Cambio olio effettuato." },
    },
    {
      id: "004",
      veicolo: "Scania R500",
      tipo: "Manutenzione",
      data: "07/06/2026",
      stato: "Programmato",
      tecnico: "Paolo Neri",
      azienda: "Truck Center",
      extra: { note: "Revisione periodica." },
    },
    {
      id: "005",
      veicolo: "Volvo FH",
      tipo: "Manutenzione",
      data: "03/06/2026",
      stato: "In corso",
      tecnico: "Roberto Verdi",
      azienda: "Truck Service",
      extra: { note: "Sostituzione pastiglie anteriori." },
    },
    {
      id: "006",
      veicolo: "Fiat Panda",
      tipo: "Pulizia",
      data: "02/06/2026",
      stato: "Completato",
      extra: {
        luogo: "Autolavaggio Blu",
        tipo_lavaggio: "Esterno",
        note: "Lavaggio rapido.",
      },
    },
  ];

  // Campi fittizi per tabella Storico
  const historyHeaders = [
    { key: "veicolo", label: "Veicolo", width: "150px" },
    { key: "data", label: "Data", width: "110px" },
    { key: "stato", label: "Stato", width: "120px" },
    { key: "tecnico", label: "Tecnico", width: "150px" },
    { key: "azienda", label: "Azienda", width: "150px" },
    { key: "intervento", label: "Intervento", width: "200px" },
  ];

  const historyData = [
    {
      id: "H001",
      veicolo: "Iveco Daily",
      data: "10/05/2026",
      stato: "Completato",
      tecnico: "Marco Bianchi",
      azienda: "AutoExpress",
      intervento: "Cambio Olio",
      extra: { costo: "150", ricambi: "Olio 5W30, Filtro Olio" },
    },
    {
      id: "H002",
      veicolo: "Fiat Panda",
      data: "15/05/2026",
      stato: "Completato",
      tecnico: "Luca Rossi",
      azienda: "General Motors",
      intervento: "Freni",
      extra: { costo: "280", ricambi: "Pastiglie anteriori, Dischi" },
    },
    {
      id: "H003",
      veicolo: "Mercedes Sprinter",
      data: "20/05/2026",
      stato: "Completato",
      tecnico: "Roberto Verdi",
      azienda: "Truck Service",
      intervento: "Revisione",
      extra: { costo: "80", note: "Superata senza anomalie." },
    },
    {
      id: "H004",
      veicolo: "Iveco Daily",
      data: "02/04/2026",
      stato: "Completato",
      tecnico: "Marco Bianchi",
      azienda: "AutoExpress",
      intervento: "Pneumatici",
      extra: { costo: "450", note: "Sostituzione treno gomme estivo." },
    },
    {
      id: "H005",
      veicolo: "Iveco Daily",
      data: "15/01/2026",
      stato: "Completato",
      tecnico: "G. Galli",
      azienda: "AutoExpress",
      intervento: "Batteria",
      extra: { costo: "120", note: "Sostituzione batteria 80Ah." },
    },
  ];

  const handleOpenModal = () => {
    setPrefilledData({});
    setIsModalOpen(true);
  };
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenCleaningModal = () => setIsCleaningModalOpen(true);
  const handleCloseCleaningModal = () => setIsCleaningModalOpen(false);

  const handleRowClick = (record) => {
    setSelectedRecord(record);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setIsDetailModalOpen(false);
    setSelectedRecord(null);
  };

  const handleAddFromDetail = () => {
    if (selectedRecord) {
      setPrefilledData({
        modello: selectedRecord.veicolo,
        // Se avessimo la targa nei dati della riga la metteremmo qui
      });
      setIsDetailModalOpen(false);
      setIsModalOpen(true);
    }
  };

  const handleFormComplete = (formData) => {
    console.log("Form Manutenzione Completato:", formData);
    alert("Prenotazione Manutenzione Inviata!");
    setIsModalOpen(false);
  };

  const handleCleaningFormComplete = (formData) => {
    console.log("Form Pulizie Completato:", formData);
    alert("Prenotazione Pulizie Inviata!");
    setIsCleaningModalOpen(false);
  };

  const filteredDefaultData =
    statusFilter === "Tutti"
      ? defaultData
      : defaultData.filter((item) => item.stato === statusFilter);

  // Trova tutti gli interventi per il veicolo selezionato (solo MANUTENZIONI)
  const vehicleHistory = selectedRecord
    ? [...defaultData, ...historyData]
        .filter((item) => item.veicolo === selectedRecord.veicolo)
        .filter((item) => item.tipo === "Manutenzione" || item.intervento) // Esclude le pulizie (che hanno tipo: "Pulizia")
    : [];

  return (
    <div className="manutenzione-page">
      <div className="page-header">
        <h1>Gestione Manutenzione</h1>
        <p>Monitora e prenota gli interventi per la flotta.</p>
      </div>

      <div className="buttons-container">
        <button
          className="btn-action"
          onClick={handleOpenModal}
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
        <div
          className="table-header-row"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "15px",
          }}
        >
          <h2 style={{ color: "var(--color-text-main)" }}>
            {currentView === "history"
              ? "Storico Manutenzioni"
              : "Interventi Programmati"}
          </h2>

          {currentView === "default" && (
            <div className="status-filters">
              {["Programmato", "In corso", "Completato", "Tutti"].map(
                (status) => (
                  <button
                    key={status}
                    className={`filter-tab ${statusFilter === status ? "active" : ""}`}
                    onClick={() => setStatusFilter(status)}
                  >
                    {status}
                  </button>
                ),
              )}
            </div>
          )}
        </div>

        <Table
          headers={currentView === "history" ? historyHeaders : defaultHeaders}
          data={currentView === "history" ? historyData : filteredDefaultData}
          onRowClick={handleRowClick}
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
            initialData={prefilledData}
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

      {/* Modale Dettaglio Record */}
      <Modal isOpen={isDetailModalOpen} onClose={handleCloseDetailModal}>
        <div style={{ padding: "30px" }}>
          <h2
            style={{
              color: "var(--color-primary)",
              marginBottom: "20px",
              borderBottom: "2px solid var(--color-border)",
              paddingBottom: "10px",
            }}
          >
            Dettaglio Manutenzione #{selectedRecord?.id}
          </h2>

          <div
            className="detail-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "20px",
              marginBottom: "30px",
            }}
          >
            <div>
              <p>
                <strong>Veicolo:</strong> {selectedRecord?.veicolo}
              </p>
              <p>
                <strong>Intervento:</strong>{" "}
                {selectedRecord?.intervento || selectedRecord?.tipo}
              </p>
              <p>
                <strong>Data:</strong> {selectedRecord?.data}
              </p>
              <p>
                <strong>Stato:</strong> {selectedRecord?.stato}
              </p>
            </div>
            <div>
              <p>
                <strong>Tecnico:</strong>{" "}
                {selectedRecord?.tecnico ||
                  selectedRecord?.extra?.tecnico ||
                  "N/D"}
              </p>
              <p>
                <strong>Azienda/Officina:</strong>{" "}
                {selectedRecord?.azienda ||
                  selectedRecord?.extra?.officina ||
                  "N/D"}
              </p>
              {selectedRecord?.extra?.costo && (
                <p>
                  <strong>Costo:</strong> €{selectedRecord.extra.costo}
                </p>
              )}
            </div>
            <div style={{ gridColumn: "span 2" }}>
              <p>
                <strong>Note/Dettagli:</strong>
              </p>
              <p
                style={{
                  backgroundColor: "#f9f9f9",
                  padding: "15px",
                  borderRadius: "8px",
                  border: "1px solid var(--color-border)",
                  marginTop: "5px",
                }}
              >
                {selectedRecord?.extra?.note ||
                  selectedRecord?.extra?.ricambi ||
                  "Dettaglio standard dell'intervento selezionato."}
              </p>
            </div>
          </div>

          {/* Cronologia Veicolo */}
          <div className="vehicle-history" style={{ marginTop: "30px" }}>
            <h3 style={{ marginBottom: "15px", color: "var(--color-primary)" }}>
              Cronologia Manutenzioni: {selectedRecord?.veicolo}
            </h3>
            <div
              style={{
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  fontSize: "0.9rem",
                }}
              >
                <thead style={{ backgroundColor: "#f1f5f9" }}>
                  <tr>
                    <th
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        borderBottom: "1px solid var(--color-border)",
                      }}
                    >
                      Data
                    </th>
                    <th
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        borderBottom: "1px solid var(--color-border)",
                      }}
                    >
                      Intervento
                    </th>
                    <th
                      style={{
                        padding: "10px",
                        textAlign: "left",
                        borderBottom: "1px solid var(--color-border)",
                      }}
                    >
                      Stato
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {vehicleHistory.map((h, i) => (
                    <tr
                      key={i}
                      style={{
                        backgroundColor:
                          h.id === selectedRecord.id
                            ? "#f0fdf4"
                            : "transparent",
                      }}
                    >
                      <td
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid var(--color-border)",
                        }}
                      >
                        {h.data}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid var(--color-border)",
                        }}
                      >
                        {h.intervento || h.tipo}
                      </td>
                      <td
                        style={{
                          padding: "10px",
                          borderBottom: "1px solid var(--color-border)",
                        }}
                      >
                        {h.stato}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "30px",
              gap: "10px"
            }}
          >
            <button className="btn-prev" onClick={handleCloseDetailModal}>
              Chiudi
            </button>
            <button className="btn-next" onClick={handleAddFromDetail}>
              Aggiungi
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Manutenzione;
