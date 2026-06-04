import React, { useState } from 'react';
import Table from '../../components/Table/Table';
import Modal from '../../components/Modal/Modal';
import './gestioneTicket.css';

import ticketsData from '../../data/tickets/tickets.json';

const assigneeOptions = ['Marina', 'Luca', 'Sara', 'Alex', 'Non assegnato'];
const statusOptions = ['Aperto', 'In corso', 'Chiuso'];
const priorityOptions = ['Alta', 'Media', 'Bassa'];

const GestioneTicket = () => {
  const [tickets, setTickets] = useState(ticketsData.tickets || []);
  const [assignedFilter, setAssignedFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editAssignedTo, setEditAssignedTo] = useState('');
  const [editStatus, setEditStatus] = useState('Aperto');
  const [editPriority, setEditPriority] = useState('Media');
  const [searchQuery, setSearchQuery] = useState('');

  const headersTicket = [
    { key: 'id', label: 'ID' },
    { key: 'titolo', label: 'Titolo' },
    { key: 'assegnato_a', label: 'Assegnato a' },
    { key: 'stato', label: 'Stato' },
    { key: 'priorita', label: 'Priorità' },
  ];

  const toggleAssignedFilter = () => {
    setAssignedFilter((current) =>
      current === 'all' ? 'assigned' : current === 'assigned' ? 'unassigned' : 'all'
    );
  };

  const toggleStatusFilter = () => {
    setStatusFilter((current) =>
      current === 'all' ? 'open' : current === 'open' ? 'closed' : 'all'
    );
  };

  const handleRowClick = (item) => {
    setSelectedItem(item);
    setEditTitle(item.titolo);
    setEditDescription(item.descrizione);
    setEditAssignedTo(item.assegnato_a || 'Non assegnato');
    setEditStatus(item.stato);
    setEditPriority(item.priorita);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleSaveTicket = () => {
    if (!selectedItem) return;

    if (selectedItem.stato !== 'Chiuso' && editStatus === 'Chiuso') {
      const confirmed = window.confirm('Sei sicuro di voler chiudere questo ticket?');
      if (!confirmed) {
        return;
      }
    }

    const updatedTicket = {
      ...selectedItem,
      titolo: editTitle,
      descrizione: editDescription,
      assegnato_a: editAssignedTo === 'Non assegnato' ? '' : editAssignedTo,
      stato: editStatus,
      priorita: editPriority,
      ultimo_aggiornamento: new Date().toISOString().slice(0, 10),
    };

    setTickets((current) =>
      current.map((ticket) => (ticket.id === updatedTicket.id ? updatedTicket : ticket))
    );
    setSelectedItem(updatedTicket);
    setIsModalOpen(false);
  };

  const filteredData = tickets.filter((item) => {
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      item.titolo.toLowerCase().includes(query) ||
      item.descrizione.toLowerCase().includes(query) ||
      (item.assegnato_a || 'Non assegnato').toLowerCase().includes(query);

    const matchesAssigned =
      assignedFilter === 'all' ||
      (assignedFilter === 'assigned' && item.assegnato_a) ||
      (assignedFilter === 'unassigned' && !item.assegnato_a);

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'open' && item.stato !== 'Chiuso') ||
      (statusFilter === 'closed' && item.stato === 'Chiuso');

    return matchesSearch && matchesAssigned && matchesStatus;
  });

  const assignedLabel =
    assignedFilter === 'all'
      ? 'Assegnati / Non assegnati'
      : assignedFilter === 'assigned'
      ? 'Solo assegnati'
      : 'Solo non assegnati';

  const statusLabel =
    statusFilter === 'all' ? 'Aperti / Chiusi' : statusFilter === 'open' ? 'Solo aperti/in corso' : 'Solo chiusi';

  const isEditable = selectedItem && selectedItem.stato !== 'Chiuso';

  return (
    <div className='gestione-page'>
      <div className="page-header">
        <h1>Gestione Ticket</h1>
        <p>Visualizza e gestisci le segnalazioni e i ticket aperti.</p>
      </div>

      <div className='buttons-container'>
        <button className={`btn-action ${assignedFilter !== 'all' ? 'active' : ''}`} onClick={toggleAssignedFilter}>
          {assignedLabel}
        </button>
        <button className={`btn-action ${statusFilter !== 'all' ? 'active' : ''}`} onClick={toggleStatusFilter}>
          {statusLabel}
        </button>
      </div>

      <div className='search-bar-container'>
        <input
          type='text'
          placeholder='Cerca ticket (titolo, descrizione, assegnato)...'
          className='search-input'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className='table-section'>
        <Table headers={headersTicket} data={filteredData} onRowClick={handleRowClick} />
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <div style={{ padding: '20px' }}>
          <h2 style={{ color: 'var(--color-primary)', marginBottom: '20px', textTransform: 'uppercase' }}>
            Dettaglio Ticket
          </h2>

          {selectedItem && (
            <div className='detail-grid'>
              {isEditable ? (
                <>
                  <label className='detail-label'>Titolo</label>
                  <input
                    className='detail-input'
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />

                  <label className='detail-label'>Descrizione</label>
                  <textarea
                    className='detail-textarea'
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  />

                  <label className='detail-label'>Assegnato a</label>
                  <select
                    className='detail-select'
                    value={editAssignedTo}
                    onChange={(e) => setEditAssignedTo(e.target.value)}
                  >
                    {assigneeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <label className='detail-label'>Stato</label>
                  <select
                    className='detail-select'
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                  >
                    {statusOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>

                  <label className='detail-label'>Priorità</label>
                  <select
                    className='detail-select'
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                  >
                    {priorityOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                <>
                  <p><strong>ID:</strong> {selectedItem.id}</p>
                  <p><strong>Titolo:</strong> {selectedItem.titolo}</p>
                  <p><strong>Descrizione:</strong> {selectedItem.descrizione}</p>
                  <p><strong>Assegnato a:</strong> {selectedItem.assegnato_a || 'Non assegnato'}</p>
                  <p><strong>Stato:</strong> {selectedItem.stato}</p>
                  <p><strong>Priorità:</strong> {selectedItem.priorita}</p>
                  <p><strong>Categoria:</strong> {selectedItem.categoria}</p>
                  <p><strong>Data apertura:</strong> {selectedItem.data_apertura}</p>
                  <p><strong>Ultimo aggiornamento:</strong> {selectedItem.ultimo_aggiornamento}</p>
                </>
              )}
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
            <button className='btn-action' onClick={handleCloseModal} style={{ flex: 1 }}>
              Chiudi
            </button>
            {isEditable && (
              <button className='btn-action active' onClick={handleSaveTicket} style={{ flex: 1 }}>
                Salva
              </button>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GestioneTicket;
