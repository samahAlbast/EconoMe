import React, { useEffect, useState } from 'react';
import { addIncomeType, updateIncomeType, deleteIncomeType, getAllNonDeletedIncomeTypes } from '../../services/incomTypeService';
import { IncomeType } from './incomType';
import './incomeType.css';

const IncomeTypesManager = () => {
  const [incomeTypes, setIncomeTypes] = useState<IncomeType[]>([]);
  const [newIncomeType, setNewIncomeType] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchIncomeTypes();
  }, []);

  const fetchIncomeTypes = async () => {
    try {
      const data = await getAllNonDeletedIncomeTypes();
      setIncomeTypes(data.incomeTypes);
    } catch (error) {
      setError('Error fetching income types.');
    }
  };

  const handleAddIncomeType = async () => {
    try {
      await addIncomeType(newIncomeType);
      setSuccessMessage('Income Type added successfully.');
      fetchIncomeTypes();
      setNewIncomeType('');
    } catch (error) {
      setError('Error adding income type.');
    }
  };

  const handleUpdateIncomeType = async (id: number, name: string) => {
    try {
      await updateIncomeType(id, name);
      setSuccessMessage('Income Type updated successfully.');
      fetchIncomeTypes();
      setEditingId(null);
      setEditingName('');
    } catch (error) {
      setError('Error updating income type.');
    }
  };

  const handleDeleteIncomeType = async (id: number) => {
    try {
      await deleteIncomeType(id);
      setSuccessMessage('Income Type deleted successfully.');
      fetchIncomeTypes();
    } catch (error) {
      setError('Error deleting income type.');
    }
  };

  return (
    <div className="types-manager">
      <h1 className="page-title">Manage Income Types</h1>

      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}

      <div className="types-list">
        <h2>Available Income Types</h2>
        <ul>
          {incomeTypes.map((type) => (
            <li key={type.id}>
              {editingId === type.id ? (
                <>
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                  />
                  <button onClick={() => handleUpdateIncomeType(type.id, editingName)}>Save</button>
                  <button onClick={() => { setEditingId(null); setEditingName(''); }}>Cancel</button>
                </>
              ) : (
                <>
                  {type.name}
                  <button onClick={() => { setEditingId(type.id); setEditingName(type.name); }}>Edit</button>
                  <button onClick={() => handleDeleteIncomeType(type.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="add-type">
        <h2>Add New Income Type</h2>
        <input
          type="text"
          value={newIncomeType}
          onChange={(e) => setNewIncomeType(e.target.value)}
          placeholder="New Income Type"
        />
        <button onClick={handleAddIncomeType} className="inputButton">Add Income Type</button>
      </div>
    </div>
  );
};

export default IncomeTypesManager;
