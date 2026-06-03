import React, { useState } from "react";
import MultiStepForm from "../../components/Form/MultiStepForm";
import "./Manutenzione.css";

const Manutenzione = () => {
  const [showForm, setShowForm] = useState(false);

  const formSteps = [
    {
      title: "Veicolo",
      fields: [
        { name: "targa", label: "Targa Veicolo", placeholder: "es. AA123BB" },
        { name: "modello", label: "Modello", placeholder: "es. Iveco Daily" },
        { name: "chilometraggio", label: "Chilometri Attuali", type: "number" },
        {
          name: "alimentazione",
          label: "Alimentazione",
          type: "select",
          options: [
            { label: "Diesel", value: "diesel" },
            { label: "Elettrico", value: "elettrico" },
            { label: "Metano", value: "metano" },
          ],
        },
      ],
    },
    {
      title: "Diagnostica",
      fields: [
        {
          name: "tipo_intervento",
          label: "Tipo Intervento",
          type: "select",
          options: [
            { label: "Tagliando", value: "tagliando" },
            { label: "Riparazione Guasto", value: "guasto" },
            { label: "Revisione", value: "revisione" },
          ],
        },
        {
          name: "priorita",
          label: "Priorità",
          type: "select",
          options: [
            { label: "Bassa", value: "bassa" },
            { label: "Media", value: "media" },
            { label: "Alta (Urgente)", value: "alta" },
          ],
        },
        {
          name: "note",
          label: "Descrizione Problema",
          type: "textarea",
          fullWidth: true,
          placeholder: "Descrivi il problema riscontrato...",
        },
      ],
    },
    {
      title: "Destinatario",
      fields: [
        {
          name: "officina",
          label: "Officina Convenzionata",
          placeholder: "Nome officina",
        },
        {
          name: "tecnico",
          label: "Tecnico Referente",
          placeholder: "Nome e cognome",
        },
        { name: "data_appuntamento", label: "Data Appuntamento", type: "date" },
        { name: "contatto", label: "Telefono/Email Contatto" },
      ],
    },
  ];

  const handleComplete = (data) => {
    alert("Form inviato con successo! Controlla la console per i dettagli.");
    setShowForm(false);
  };

  return (
    <div className="manutenzione-page">
      <div className="page-header">
        <div>
          <h1>Gestione Manutenzione</h1>
          <p>Prova form manutenzioni</p>
        </div>
        <button
          className="btn-primary-test"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Annulla" : "+ Nuovo Intervento"}
        </button>
      </div>

      {showForm ? (
        <MultiStepForm steps={formSteps} onComplete={handleComplete} />
      ) : (
        <div>
          <p>Aggiungi Intervento.</p>
        </div>
      )}
    </div>
  );
};

export default Manutenzione;
