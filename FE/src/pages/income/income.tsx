import React, { useEffect, useState } from 'react';
import { getAllNonDeletedIncomeTypes } from '../../services/incomTypeService';
import { getAllNonDeletedIncomes, addIncome, updateIncome, deleteIncome, getTotalAvailableIncome } from '../../services/incomeService';
import { IncomeType } from '../incomType/incomType';
import './income.css';

interface Income {
  id: number;
  userId: number;
  incomeTypeId: number;
  initialAmount: number;
  notes?: string;
  createdAt: Date;
  updatedAt?: Date;
  deleted: boolean;
}

const AddIncome = () => {
  const [incomeTypes, setIncomeTypes] = useState<IncomeType[]>([]);
  const [incomes, setIncomes] = useState<Income[]>([]);
  const [totalAvailableIncome, setTotalAvailableIncome] = useState(0);
  const [selectedIncomeType, setSelectedIncomeType] = useState<number | null>(null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingAmount, setEditingAmount] = useState('');
  const [editingDescription, setEditingDescription] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    fetchIncomeTypes();
    fetchUserIncomes();
    fetchTotalAvailableIncome();
  }, []);

  const fetchIncomeTypes = async () => {
    try {
      const data = await getAllNonDeletedIncomeTypes();
      setIncomeTypes(data.incomeTypes);
    } catch (error) {
      setError('Error fetching income types.');
    }
  };

  const fetchUserIncomes = async () => {
    try {
      const data = await getAllNonDeletedIncomes();
      setIncomes(data.incomes);
    } catch (error) {
      setError('Error fetching user incomes.');
    }
  };

  const fetchTotalAvailableIncome = async () => {
    try {
      const data = await getTotalAvailableIncome();
      setTotalAvailableIncome(data.totalAvailableIncome);
    } catch (error) {
      setError('Error fetching total available income.');
    }
  };

  const handleAddIncome = async () => {
    if (selectedIncomeType === null) {
      setError('Please select an income type.');
      return;
    }

    if (amount === '' || isNaN(Number(amount))) {
      setError('Please enter a valid amount.');
      return;
    }

    try {
      await addIncome({
        incomeTypeId: selectedIncomeType,
        initialAmount: Number(amount),
        notes: description,
        userId: 1, 
        deleted: false
      });
      setSuccessMessage('Income added successfully.');
      fetchUserIncomes();
      fetchTotalAvailableIncome(); 
      setSelectedIncomeType(null);
      setAmount('');
      setDescription('');
    } catch (error) {
      setError('Error adding income.');
    }
  };

  const handleUpdateIncome = async (id: number) => {
    if (editingAmount === '' || isNaN(Number(editingAmount))) {
      setError('Please enter a valid amount.');
      return;
    }

    try {
      await updateIncome(id, {
        initialAmount: Number(editingAmount),
        notes: editingDescription
      });
      setSuccessMessage('Income updated successfully.');
      fetchUserIncomes();
      fetchTotalAvailableIncome(); // Update total available income
      setEditingId(null);
      setEditingAmount('');
      setEditingDescription('');
    } catch (error) {
      setError('Error updating income.');
    }
  };

  const handleDeleteIncome = async (id: number) => {
    try {
      await deleteIncome(id);
      setSuccessMessage('Income deleted successfully.');
      fetchUserIncomes();
      fetchTotalAvailableIncome(); // Update total available income
    } catch (error) {
      setError('Error deleting income.');
    }
  };

  return (
    <div className="add-income">
      <h1 className="page-title">Manage Incomes</h1>

      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}

      <div className="total-available-income">
        <h2>Total Available Income: ${totalAvailableIncome}</h2>
      </div>

      <div className="types-list">
      <h2>Your Incomes</h2>
      <ul>
        {incomes.map((income) => (
          <li key={income.id}>
            {editingId === income.id ? (
              <div className="editing-section">
                <input
                  type="number"
                  value={editingAmount}
                  onChange={(e) => setEditingAmount(e.target.value)}
                  placeholder="Amount"
                />
                <input
                  type="text"
                  value={editingDescription}
                  onChange={(e) => setEditingDescription(e.target.value)}
                  placeholder="Note"
                />
                
                <div>
                  <button onClick={() => handleUpdateIncome(income.id)}>Save</button>
                  <button className="cancel" onClick={() => { setEditingId(null); setEditingAmount(''); setEditingDescription(''); }}>Cancel</button>
                </div>
              </div>
            ) : (
              <>
                <span>${income.initialAmount}</span>
                <span>({incomeTypes.find(type => type.id === income.incomeTypeId)?.name || 'Unknown'})</span>
                <span><strong>Note:</strong> {income.notes}</span>
                <span><strong>Date Deposited:</strong> {new Date(income.createdAt).toLocaleDateString()}</span>
                <div>
                  <button onClick={() => { setEditingId(income.id); setEditingAmount(income.initialAmount.toString()); setEditingDescription(income.notes || ''); }}>Edit</button>
                  <button className="cancel" onClick={() => handleDeleteIncome(income.id)}>Delete</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>


      <div className="add-income">
        <h2>Add New Income</h2>
        <div className="form-group">
          <label htmlFor="incomeType">Income Type</label>
          <select
            id="incomeType"
            value={selectedIncomeType ?? ''}
            onChange={(e) => setSelectedIncomeType(Number(e.target.value))}
          >
            <option value="" disabled>Select an income type</option>
            {incomeTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="text"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Note</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description (optional)"
          ></textarea>
        </div>

        <button onClick={handleAddIncome} className="inputButton">Add Income</button>
      </div>
    </div>
  );
};

export default AddIncome;
