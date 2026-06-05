import React, { useState } from 'react';
import Table from '../../components/Table/Table';
import Modal from '../../components/Modal/Modal';
import MultiStepForm from '../../components/Form/MultiStepForm';
import { useAuth } from '../../context/useAuth';
import './GetioneVeicoliStazioni.css';

import veicoliData from '../../data/veicoli/veicoli.json';
import stazioniData from '../../data/stazioni/stazioni.json';
import utentiData from '../../data/utenti.json';

const GestioneVeicoliStazioni = () => {
  const { user } = useAuth();
  const role = user?.role?.toString().trim().toLowerCase();
  const isAdmin = role === 'admin';

  const [activeTab, setActiveTab] = useState('veicoli');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); 
  const [isAddVehicleModalOpen, setIsAddVehicleModalOpen] = useState(false);
  const [isAddStationModalOpen, setIsAddStationModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [veicoli, setVeicoli] = useState(veicoliData.veicoli || []);
  const [stazioni, setStazioni] = useState(stazioniData.stazioni || []);
  const [utenti, setUtenti] = useState(() => {
    return Array.isArray(utentiData) ? utentiData : (utentiData.utenti || []);
  });

  const formatTipoVeicolo = (tipo) => {
    if (!tipo) return '';
    const normalized = tipo.toString().toLowerCase().trim();
    if (['auto', 'auto_elettrica', 'auto elettrica', 'automobile_elettrica', 'automobile elettrica'].includes(normalized)) {
      return 'Automobile Elettrica';
    }
    if (['bici', 'bicicletta', 'bicicletta elettrica'].includes(normalized)) {
      return 'Bicicletta';
    }
    return tipo;
  };

  const headersVeicoli = [
    { key: 'id', label: 'ID', width: '60px' },
    { key: 'targa_codice', label: 'Targa / Codice' },
    { key: 'tipo', label: 'Tipo' },
    { key: 'modello', label: 'Modello' },
    { key: 'stato', label: 'Stato' },
    { key: 'livello_batteria', label: 'Batteria' },
    { key: 'azioni', label: 'Azioni', width: '180px' }
  ];

  const headersStazioni = [
    { key: 'id', label: 'ID', width: '60px' },
    { key: 'nome', label: 'Nome Stazione' },
    { key: 'indirizzo', label: 'Indirizzo' },
    { key: 'tipo', label: 'Tipo' },
    { key: 'capacita', label: 'Capacità' },
    { key: 'azioni', label: 'Azioni', width: '180px' }
  ];

  const headersUtenti = [
    { key: 'id', label: 'ID', width: '60px' },
    { key: 'nome', label: 'Nome' },
    { key: 'cognome', label: 'Cognome' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Ruolo' },
    { key: 'azioni', label: 'Azioni', width: '180px' }
  ];

  const addVehicleSteps = [
    {
      title: "Dati Veicolo",
      fields: [
        { name: "targa_codice", label: "Targa / Codice", placeholder: "es. AA123BB o EV-01" },
        { name: "tipo", label: "Tipo Veicolo", type: "select", options: [
          { label: "Automobile Elettrica", value: "automobile elettrica" },
          { label: "Bicicletta", value: "bicicletta" }
        ]},
        { name: "modello", label: "Modello", placeholder: "es. Tesla Model 3" },
        { name: "livello_batteria", label: "Livello Batteria (%)", type: "number" },
        { name: "km_totali", label: "KM Totali", type: "number" },
        { name: "data_immatricolazione", label: "Data Immatricolazione", type: "date" }
      ]
    }
  ];

  const addStationSteps = [
    {
      title: "Dati Stazione",
      fields: [
        { name: "nome", label: "Nome Stazione", placeholder: "es. Stazione Centrale" },
        { name: "indirizzo", label: "Indirizzo", placeholder: "es. Via Roma, 10" },
        { name: "tipo", label: "Tipo", type: "select", options: [
          { label: "Ricarica Rapida", value: "rapida" },
          { label: "Ricarica Standard", value: "standard" },
          { label: "Parcheggio Semplice", value: "parcheggio" }
        ]},
        { name: "capacita", label: "Capacità (Posti)", type: "number" },
        { name: "lat", label: "Latitudine", type: "number" },
        { name: "long", label: "Longitudine", type: "number" }
      ]
    }
  ];

  const addUserSteps = [
    {
      title: "Dati Utente",
      fields: [
        { name: "nome", label: "Nome", placeholder: "es. Mario" },
        { name: "cognome", label: "Cognome", placeholder: "es. Rossi" },
        { name: "email", label: "Email", type: "email", placeholder: "mario.rossi@example.com" },
        { name: "role", label: "Ruolo", type: "select", options: [
          { label: "Amministratore", value: "admin" },
          { label: "Tecnico", value: "tecnico" },
          { label: "Supporto", value: "supporto" }
        ]},
        { name: "password", label: "Password Temporanea", type: "password" }
      ]
    }
  ];

  const getEditSteps = () => {
    if (!selectedItem) return [];
    
    if (activeTab === 'veicoli') {
      return [
        {
          title: "Dati Veicolo",
          fields: [
            { name: "targa_codice", label: "Targa / Codice" },
            { name: "tipo", label: "Tipo Veicolo", type: "select", options: [
              { label: "Automobile Elettrica", value: "automobile elettrica" },
              { label: "Bicicletta", value: "bicicletta" }
            ]},
            { name: "modello", label: "Modello" },
            { name: "stato", label: "Stato", type: "select", options: [
              { label: "Disponibile", value: "disponibile" },
              { label: "In Uso", value: "in_uso" },
              { label: "In Ricarica", value: "caricando" },
              { label: "Guasto/Manutenzione", value: "guasto" }
            ]},
            { name: "livello_batteria", label: "Livello Batteria (%)", type: "number" },
            { name: "km_totali", label: "KM Totali", type: "number" },
            { name: "data_immatricolazione", label: "Data Immatricolazione", type: "date" }
          ]
        }
      ];
    }

    if (activeTab === 'stazioni') {
      return [
        {
          title: "Dati Stazione",
          fields: [
            { name: "nome", label: "Nome Stazione" },
            { name: "indirizzo", label: "Indirizzo" },
            { name: "tipo", label: "Tipo", type: "select", options: [
              { label: "Ricarica Rapida", value: "rapida" },
              { label: "Ricarica Standard", value: "standard" },
              { label: "Parcheggio Semplice", value: "parcheggio" }
            ]},
            { name: "capacita", label: "Capacità (Posti)", type: "number" },
            { name: "lat", label: "Latitudine", type: "number" },
            { name: "long", label: "Longitudine", type: "number" }
          ]
        }
      ];
    }

    if (activeTab === 'utenti') {
      return [
        {
          title: "Dati Utente",
          fields: [
            { name: "nome", label: "Nome" },
            { name: "cognome", label: "Cognome" },
            { name: "email", label: "Email", type: "email" },
            { name: "role", label: "Ruolo", type: "select", options: [
              { label: "Amministratore", value: "admin" },
              { label: "Tecnico", value: "tecnico" },
              { label: "Supporto", value: "supporto" }
            ]}
          ]
        }
      ];
    }
    return [];
  };

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedItem(null);
  };

  const handleOpenAddVehicleModal = () => setIsAddVehicleModalOpen(true);
  const handleCloseAddVehicleModal = () => setIsAddVehicleModalOpen(false);

  const handleOpenAddStationModal = () => setIsAddStationModalOpen(true);
  const handleCloseAddStationModal = () => setIsAddStationModalOpen(false);

  const handleOpenAddUserModal = () => setIsAddUserModalOpen(true);
  const handleCloseAddUserModal = () => setIsAddUserModalOpen(false);

  const handleAddVehicleComplete = (formData) => {
    setVeicoli((prev) => {
      const nextId = prev.length > 0 ? Math.max(...prev.map(v => Number(v.id) || 0)) + 1 : 1;
      return [...prev, { id: nextId, stato: "disponibile", ...formData }];
    });
    setIsAddVehicleModalOpen(false);
  };

  const handleAddStationComplete = (formData) => {
    setStazioni((prev) => {
      const nextId = prev.length > 0 ? Math.max(...prev.map(s => Number(s.id) || 0)) + 1 : 1;
      return [...prev, { id: nextId, ...formData }];
    });
    setIsAddStationModalOpen(false);
  };

  const handleAddUserComplete = (formData) => {
    setUtenti((prev) => {
      const nextId = prev.length > 0 ? Math.max(...prev.map(u => Number(u.id) || 0)) + 1 : 1;
      return [...prev, { id: nextId, attivo: true, ...formData }];
    });
    setIsAddUserModalOpen(false);
  };

  const handleEditComplete = (formData) => {
    const updatedItem = {
      ...selectedItem,
      ...formData,
      id: selectedItem.id 
    };

    if (updatedItem.livello_batteria !== undefined) updatedItem.livello_batteria = Number(updatedItem.livello_batteria);
    if (updatedItem.km_totali !== undefined) updatedItem.km_totali = Number(updatedItem.km_totali);
    if (updatedItem.capacita !== undefined) updatedItem.capacita = Number(updatedItem.capacita);
    if (updatedItem.lat !== undefined) updatedItem.lat = Number(updatedItem.lat);
    if (updatedItem.long !== undefined) updatedItem.long = Number(updatedItem.long);

    if (activeTab === 'veicoli') {
      setVeicoli(prev => prev.map(item => item.id === selectedItem.id ? updatedItem : item));
    } else if (activeTab === 'stazioni') {
      setStazioni(prev => prev.map(item => item.id === selectedItem.id ? updatedItem : item));
    } else if (activeTab === 'utenti') {
      setUtenti(prev => prev.map(item => item.id === selectedItem.id ? updatedItem : item));
    }

    setIsEditModalOpen(false);
    setSelectedItem(null);
  };

  const handleDeleteItem = (id) => {
    const conferma = window.confirm(`Sei sicuro di voler eliminare l'elemento con ID ${id}?`);
    if (!conferma) return;

    if (activeTab === 'veicoli') {
      setVeicoli(prev => prev.filter(item => item.id !== id));
    } else if (activeTab === 'stazioni') {
      setStazioni(prev => prev.filter(item => item.id !== id));
    } else if (activeTab === 'utenti') {
      setUtenti(prev => prev.filter(item => item.id !== id));
    }
  };

  const getRawData = () => {
    switch (activeTab) {
      case 'veicoli': return veicoli;
      case 'stazioni': return stazioni;
      case 'utenti': return isAdmin ? utenti : [];
      default: return [];
    }
  };

  const filteredData = getRawData().filter(item => {
    const query = searchQuery.toLowerCase();
    if (activeTab === 'veicoli') {
      const formattedTipo = formatTipoVeicolo(item.tipo).toLowerCase();
      return (
        item.targa_codice?.toLowerCase().includes(query) ||
        item.modello?.toLowerCase().includes(query) ||
        formattedTipo.includes(query) ||
        item.stato?.toLowerCase().includes(query)
      );
    } else if (activeTab === 'stazioni') {
      return (
        item.nome?.toLowerCase().includes(query) ||
        item.indirizzo?.toLowerCase().includes(query) ||
        item.tipo?.toLowerCase().includes(query)
      );
    } else { 
      return (
        item.nome?.toLowerCase().includes(query) ||
        item.cognome?.toLowerCase().includes(query) ||
        item.email?.toLowerCase().includes(query) ||
        item.role?.toLowerCase().includes(query)
      );
    }
  });

  const tableData = filteredData.map(item => ({
    ...item,
    tipo: activeTab === 'veicoli' ? formatTipoVeicolo(item.tipo) : item.tipo,
    livello_batteria: item.livello_batteria !== null && item.livello_batteria !== undefined ? `${item.livello_batteria}%` : 'N/D',
    azioni: (
      <div style={{ display: 'flex', gap: '8px' }}>
        <button 
          className='btn-edit' 
          onClick={(e) => {
            e.stopPropagation();
            
            const itemToEdit = { ...item };
            
            if (activeTab === 'veicoli' && itemToEdit.tipo) {
              const tipoNormalizzato = itemToEdit.tipo.toString().toLowerCase().trim();
              if (['auto', 'auto_elettrica', 'auto elettrica', 'automobile_elettrica', 'automobile elettrica'].includes(tipoNormalizzato)) {
                itemToEdit.tipo = 'automobile elettrica';
              } else if (['bici', 'bicicletta', 'bicicletta elettrica'].includes(tipoNormalizzato)) {
                itemToEdit.tipo = 'bicicletta';
              }
            }

            setSelectedItem(itemToEdit);
            setIsEditModalOpen(true);
          }}
        >
          Modifica
        </button>
        <button 
          className='btn-delete' 
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteItem(item.id);
          }}
        >
          Elimina
        </button>
      </div>
    )
  }));

  return (
    <div className='gestione-page'>
      <div className="page-header">
        <h1>Gestione</h1>
        <p>Da qui puoi aggiungere, modificare e rimuovere veicoli, stazioni e utenti.</p>
      </div>

      <div className='buttons-container'>
        <button 
          className={`btn-action ${activeTab === 'veicoli' ? 'active' : ''}`}
          onClick={() => { setActiveTab('veicoli'); setSearchQuery(''); }}
        >
          Lista Veicoli
        </button>
        <button 
          className={`btn-action ${activeTab === 'stazioni' ? 'active' : ''}`}
          onClick={() => { setActiveTab('stazioni'); setSearchQuery(''); }}
        >
          Lista Stazioni
        </button>
        
        {isAdmin && (
          <button 
            className={`btn-action ${activeTab === 'utenti' ? 'active' : ''}`}
            onClick={() => { setActiveTab('utenti'); setSearchQuery(''); }}
          >
            Lista Utenti
          </button>
        )}
      </div>

      <div className='search-bar-container'>
        <input 
          type='text' 
          placeholder={`Cerca ${
            activeTab === 'veicoli' ? 'veicolo (targa, tipo, modello, stato)...' : 
            activeTab === 'stazioni' ? 'stazione (nome, indirizzo, tipo)...' : 'utente (nome, email, ruolo)...'
          }`}
          className='search-input'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className='table-section'>
        <Table 
          headers={
            activeTab === 'veicoli' ? headersVeicoli : 
            activeTab === 'stazioni' ? headersStazioni : headersUtenti
          } 
          data={tableData} 
          onRowClick={handleRowClick}
        />
        
        {activeTab === 'veicoli' && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button className='btn-add-vehicle' onClick={handleOpenAddVehicleModal}>
              + Aggiungi Veicolo
            </button>
          </div>
        )}

        {activeTab === 'stazioni' && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button className='btn-add-vehicle' onClick={handleOpenAddStationModal}>
              + Aggiungi Stazione
            </button>
          </div>
        )}

        {activeTab === 'utenti' && isAdmin && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
            <button className='btn-add-vehicle' onClick={handleOpenAddUserModal}>
              + Aggiungi Utente
            </button>
          </div>
        )}
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div style={{ padding: '20px' }}>
          <h2 style={{ color: 'var(--color-primary)', marginBottom: '20px', textTransform: 'uppercase' }}>
            Dettaglio {activeTab === 'veicoli' ? 'Veicolo' : activeTab === 'stazioni' ? 'Stazione' : 'Utente'}
          </h2>
          
          {selectedItem && (
            <div className='detail-grid' style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activeTab === 'veicoli' && (
                <>
                  <p><strong>ID:</strong> {selectedItem.id}</p>
                  <p><strong>Targa / Codice:</strong> {selectedItem.targa_codice}</p>
                  <p><strong>Tipo:</strong> {formatTipoVeicolo(selectedItem.tipo)}</p>
                  <p><strong>Modello:</strong> {selectedItem.modello}</p>
                  <p><strong>Stato:</strong> {selectedItem.stato}</p>
                  <p><strong>Livello Batteria:</strong> {selectedItem.livello_batteria}</p>
                  <p><strong>KM Totali:</strong> {selectedItem.km_totali}</p>
                  <p><strong>Ultima Revisione:</strong> {selectedItem.ultima_revisione || 'N/A'}</p>
                  <p><strong>Data d'Immatricolazione:</strong> {selectedItem.data_immatricolazione}</p>
                </>
              )}
              {activeTab === 'stazioni' && (
                <>
                  <p><strong>ID:</strong> {selectedItem.id}</p>
                  <p><strong>Nome:</strong> {selectedItem.nome}</p>
                  <p><strong>Indirizzo:</strong> {selectedItem.indirizzo}</p>
                  <p><strong>Tipo:</strong> {selectedItem.tipo}</p>
                  <p><strong>Capacità:</strong> {selectedItem.capacita}</p>
                  <p><strong>Coordinate:</strong> {selectedItem.lat}, {selectedItem.long}</p>
                </>
              )}
              {activeTab === 'utenti' && (
                <>
                  <p><strong>ID:</strong> {selectedItem.id}</p>
                  <p><strong>Nome:</strong> {selectedItem.nome}</p>
                  <p><strong>Cognome:</strong> {selectedItem.cognome}</p>
                  <p><strong>Email:</strong> {selectedItem.email}</p>
                  <p><strong>Ruolo:</strong> {selectedItem.role}</p>
                  <p><strong>Stato Account:</strong> {selectedItem.attivo ? '✅ Attivo' : '❌ Disattivato'}</p>
                </>
              )}
            </div>
          )}
          
          <button className='btn-action' onClick={handleCloseModal} style={{ marginTop: '25px', width: '100%' }}>
            Chiudi
          </button>
        </div>
      </Modal>

      <Modal isOpen={isEditModalOpen} onClose={handleCloseEditModal}>
        <div style={{ padding: '20px' }}>
          <h2 style={{ color: 'var(--color-primary)', marginBottom: '20px', textTransform: 'uppercase' }}>
            Modifica {activeTab === 'veicoli' ? 'Veicolo' : activeTab === 'stazioni' ? 'Stazione' : 'Utente'}
          </h2>
          {selectedItem && (
            <MultiStepForm 
              steps={getEditSteps()} 
              onComplete={handleEditComplete} 
              initialData={selectedItem}
            />
          )}
        </div>
      </Modal>

      <Modal isOpen={isAddVehicleModalOpen} onClose={handleCloseAddVehicleModal}>
        <div style={{ padding: '20px' }}>
          <h2 style={{ color: 'var(--color-primary)', marginBottom: '20px', textTransform: 'uppercase' }}>Nuovo Veicolo</h2>
          <MultiStepForm steps={addVehicleSteps} onComplete={handleAddVehicleComplete} />
        </div>
      </Modal>

      <Modal isOpen={isAddStationModalOpen} onClose={handleCloseAddStationModal}>
        <div style={{ padding: '20px' }}>
          <h2 style={{ color: 'var(--color-primary)', marginBottom: '20px', textTransform: 'uppercase' }}>Nuova Stazione</h2>
          <MultiStepForm steps={addStationSteps} onComplete={handleAddStationComplete} />
        </div>
      </Modal>

      <Modal isOpen={isAddUserModalOpen} onClose={handleCloseAddUserModal}>
        <div style={{ padding: '20px' }}>
          <h2 style={{ color: 'var(--color-primary)', marginBottom: '20px', textTransform: 'uppercase' }}>Nuovo Utente</h2>
          <MultiStepForm steps={addUserSteps} onComplete={handleAddUserComplete} />
        </div>
      </Modal>
    </div>
  );
};

export default GestioneVeicoliStazioni;