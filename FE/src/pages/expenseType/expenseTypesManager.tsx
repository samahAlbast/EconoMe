import React, { useEffect, useState } from 'react';
import { addExpenseType, updateExpenseType, deleteExpenseType, getAllNonDeletedExpenseTypes } from '../../Services/expenseTypeService';
import { ExpenseType } from './expenseType';
import './expenseType.css';

const ExpenseTypesManager = () => {
  const [expenseTypes, setExpenseTypes] = useState<ExpenseType[]>([]);
  const [newExpenseType, setNewExpenseType] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingName, setEditingName] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchExpenseTypes();
  }, []);

  const fetchExpenseTypes = async () => {
    try {
      const data = await getAllNonDeletedExpenseTypes();
      setExpenseTypes(data.expenseTypes);
    } catch (error) {
      setError('Error fetching expense types.');
    }
  };

  const handleAddExpenseType = async () => {
    try {
      await addExpenseType(newExpenseType);
      setSuccessMessage('Expense Type added successfully.');
      fetchExpenseTypes();
      setNewExpenseType('');
    } catch (error) {
      setError('Error adding expense type.');
    }
  };

  const handleUpdateExpenseType = async (id: number, name: string) => {
    try {
      await updateExpenseType(id, name);
      setSuccessMessage('Expense Type updated successfully.');
      fetchExpenseTypes();
      setEditingId(null);
      setEditingName('');
    } catch (error) {
      setError('Error updating expense type.');
    }
  };

  const handleDeleteExpenseType = async (id: number) => {
    try {
      await deleteExpenseType(id);
      setSuccessMessage('Expense Type deleted successfully.');
      fetchExpenseTypes();
    } catch (error) {
      setError('Error deleting expense type.');
    }
  };

  return (
    <div className="types-manager">
      <h1 className="page-title">Manage Expense Types</h1>

      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}

      <div className="types-list">
        <h2>Available Expense Types</h2>
        <ul>
          {expenseTypes.map((type) => (
            <li key={type.id}>
              {editingId === type.id ? (
                <>
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                  />
                  <button onClick={() => handleUpdateExpenseType(type.id, editingName)}>Save</button>
                  <button onClick={() => { setEditingId(null); setEditingName(''); }}>Cancel</button>
                </>
              ) : (
                <>
                  {type.name}
                  <button onClick={() => { setEditingId(type.id); setEditingName(type.name); }}>Edit</button>
                  <button onClick={() => handleDeleteExpenseType(type.id)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="add-type">
        <h2>Add New Expense Type</h2>
        <input
          type="text"
          value={newExpenseType}
          onChange={(e) => setNewExpenseType(e.target.value)}
          placeholder="New Expense Type"
        />
        <button onClick={handleAddExpenseType} className="inputButton">Add Expense Type</button>
      </div>
    </div>
  );
};

export default ExpenseTypesManager;
