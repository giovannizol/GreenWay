import React from "react";
import Table from "../../components/Table/Table";

const Manutenzione = () => {
  const headers = [
    { key: "id", label: "ID" },
    { key: "veicolo", label: "Veicolo" },
    { key: "intervento", label: "Tipo Intervento" },
    { key: "data", label: "Scadenza" },
    { key: "stato", label: "Stato" },
  ];

  const data = [
    {
      id: "001",
      veicolo: "Iveco Daily",
      intervento: "Tagliando",
      data: "12/06/2026",
      stato: "In attesa",
    },
    {
      id: "002",
      veicolo: "Renault Kangoo",
      intervento: "Revisione",
      data: "20/07/2026",
      stato: "Programmato",
    },
  ];

  return (
    <>
      <h1>Test componente tabella - default</h1>
      <Table headers={headers} data={data} />
    </>
  );
};

export default Manutenzione;
