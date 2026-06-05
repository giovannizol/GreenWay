import React, { useState } from 'react';
import Table from '../../components/Table/Table';
import Modal from '../../components/Modal/Modal';
import './GetioneVeicoliStazioni.css';

import veicoliData from '../../data/veicoli/veicoli.json';
import stazioniData from '../../data/stazioni/stazioni.json';

const GestioneVeicoliStazioni = () => {
  const [activeTab, setActiveTab] = useState('veicoli');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const dataVeicoli = veicoliData.veicoli || [];
  const dataStazioni = stazioniData.stazioni || [];

  const headersVeicoli = [
    { key: 'id', label: 'ID' },
    { key: 'targa_codice', label: 'Targa / Codice' },
    { key: 'tipo', label: 'Tipo' },
    { key: 'stato', label: 'Stato' },
    { key: 'livello_batteria', label: 'Batteria' }
  ];

  const headersStazioni = [
    { key: 'id', label: 'ID' },
    { key: 'nome', label: 'Nome Stazione' },
    { key: 'indirizzo', label: 'Indirizzo' },
    { key: 'tipo', label: 'Tipo' },
    { key: 'capacita', label: 'Capacità' }
  ];

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const filteredData = (activeTab === 'veicoli' ? dataVeicoli : dataStazioni).filter(item => {
    const query = searchQuery.toLowerCase();
    if (activeTab === 'veicoli') {
      return (
        item.targa_codice?.toLowerCase().includes(query) ||
        item.tipo?.toLowerCase().includes(query) ||
        item.stato?.toLowerCase().includes(query)
      );
    } else {
      return (
        item.nome?.toLowerCase().includes(query) ||
        item.indirizzo?.toLowerCase().includes(query) ||
        item.tipo?.toLowerCase().includes(query)
      );
    }
  });

  return (
    <div className='gestione-page'>
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
      </div>

      <div className='search-bar-container'>
        <input 
          type='text' 
          placeholder={`Cerca ${activeTab === 'veicoli' ? 'veicolo (targa, tipo, stato)...' : 'stazione (nome, indirizzo, tipo)...'}`}
          className='search-input'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className='table-section'>
        <Table 
          headers={activeTab === 'veicoli' ? headersVeicoli : headersStazioni} 
          data={filteredData.map(item => ({
            ...item,
            livello_batteria: item.livello_batteria !== null && item.livello_batteria !== undefined ? `${item.livello_batteria}%` : 'N/D'
          }))} 
          onRowClick={handleRowClick}
        />
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div style={{ padding: '20px' }}>
          <h2 style={{ color: 'var(--color-primary)', marginBottom: '20px', textTransform: 'uppercase' }}>
            Dettaglio {activeTab === 'veicoli' ? 'Veicolo' : 'Stazione'}
          </h2>
          
          {selectedItem && (
            <div className='detail-grid' style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {activeTab === 'veicoli' ? (
                <>
                  <p><strong>ID:</strong> {selectedItem.id}</p>
                  <p><strong>Targa / Codice:</strong> {selectedItem.targa_codice}</p>
                  <p><strong>Tipo:</strong> {selectedItem.tipo}</p>
                  <p><strong>Stato:</strong> {selectedItem.stato}</p>
                  <p><strong>Livello Batteria:</strong> {selectedItem.livello_batteria !== null && selectedItem.livello_batteria !== undefined ? `${selectedItem.livello_batteria}%` : 'N/D'}</p>
                  <p><strong>KM Totali:</strong> {selectedItem.km_totali}</p>
                  <p><strong>Ultima Revisione:</strong> {selectedItem.ultima_revisione || 'N/A'}</p>
                  <p><strong>Data d'Immatricolazione:</strong> {selectedItem.data_immatricolazione}</p>
                </>
              ) : (
                <>
                  <p><strong>ID:</strong> {selectedItem.id}</p>
                  <p><strong>Nome:</strong> {selectedItem.nome}</p>
                  <p><strong>Indirizzo:</strong> {selectedItem.indirizzo}</p>
                  <p><strong>Tipo:</strong> {selectedItem.tipo}</p>
                  <p><strong>Capacità:</strong> {selectedItem.capacita}</p>
                  <p><strong>Coordinate:</strong> {selectedItem.lat}, {selectedItem.long}</p>
                </>
              )}
            </div>
          )}
          
          <button 
            className='btn-action' 
            onClick={handleCloseModal} 
            style={{ marginTop: '25px', width: '100%' }}
          >
            Chiudi
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default GestioneVeicoliStazioni;
