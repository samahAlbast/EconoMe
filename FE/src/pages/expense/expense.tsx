import React, { useEffect, useState } from 'react';
import { getAllNonDeletedExpenseTypes } from '../../services/expenseTypeService';
import { getAllExpenses, addExpense, updateExpense, deleteExpense } from '../../services/expenseService';
import { getTotalAvailableIncome } from '../../services/incomeService';
import { ExpenseType } from '../expenseType/expenseType';
import { getSessionUser } from '../../services/userService';
import './expense.css';

interface Expense {
  id: number;
  userId: number;
  expenseTypeId: number;
  amount: number;
  notes?: string;
  createdAt: Date;
  updatedAt?: Date;
  deleted: boolean;
}

const ExpenseManager: React.FC = () => {
  const [expenseTypes, setExpenseTypes] = useState<ExpenseType[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalAvailableIncome, setTotalAvailableIncome] = useState(0);
  const [selectedExpenseType, setSelectedExpenseType] = useState<number | null>(null);
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingAmount, setEditingAmount] = useState('');
  const [editingDescription, setEditingDescription] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userId, setUserId] = useState<number | 1>(1);

  useEffect(() => {
    fetchUserId();
    fetchExpenseTypes();
    fetchExpenses();
    fetchTotalAvailableIncome();
  }, []);

  const fetchUserId = async () => {
    try {
      const userId = await getSessionUser();  
      setUserId(userId);
    } catch (error) {
      setError('Error fetching user information.');
    }
  };

  const fetchExpenseTypes = async () => {
    try {
      const data = await getAllNonDeletedExpenseTypes();
      setExpenseTypes(data.expenseTypes);
    } catch (error) {
      setError('Error fetching expense types.');
    }
  };

  const fetchExpenses = async () => {
    try {
      const data = await getAllExpenses();
      setExpenses(data.expenses);
    } catch (error) {
      setError('Error fetching expenses.');
    }
  };

  const fetchTotalAvailableIncome = async () => {
    try {
      const data = await getTotalAvailableIncome(userId);
      setTotalAvailableIncome(data.totalAvailableIncome);
    } catch (error) {
      setError('Error fetching total available income.');
    }
  };

  const handleAddExpense = async () => {
    if (selectedExpenseType === null) {
      setError('Please select an expense type.');
      return;
    }

    if (amount === '' || isNaN(Number(amount))) {
      setError('Please enter a valid amount.');
      return;
    }

    if (Number(amount) > totalAvailableIncome) {
      setError('Expense amount exceeds total available income.');
      return;
    }

    try {
      await addExpense({
        expenseTypeId: selectedExpenseType,
        amount: Number(amount),
        notes: description,
        userId: userId, // Assuming userId is 1 for now
      });
      setSuccessMessage('Expense added successfully.');
      fetchExpenses();
      fetchTotalAvailableIncome(); // Update total available income
      setSelectedExpenseType(null);
      setAmount('');
      setDescription('');
    } catch (error) {
      setError('Error adding expense.');
    }
  };

  const handleUpdateExpense = async (id: number) => {
    if (editingAmount === '' || isNaN(Number(editingAmount))) {
      setError('Please enter a valid amount.');
      return;
    }

    try {
      await updateExpense(id, {
        amount: Number(editingAmount),
        notes: editingDescription
      });
      setSuccessMessage('Expense updated successfully.');
      fetchExpenses();
      setEditingId(null);
      setEditingAmount('');
      setEditingDescription('');
    } catch (error) {
      setError('Error updating expense.');
    }
  };

  const handleDeleteExpense = async (id: number) => {
    try {
      await deleteExpense(id);
      setSuccessMessage('Expense deleted successfully.');
      fetchExpenses();
      fetchTotalAvailableIncome(); // Update total available income
    } catch (error) {
      setError('Error deleting expense.');
    }
  };

  return (
    <div className="expense-manager">
        <h1 className="page-title">Manage Expenses</h1>
        <div className="total-available-income">
          <h2>Total Available Account Money: ${totalAvailableIncome}</h2>
        </div>

      {error && <div className="error">{error}</div>}
      {successMessage && <div className="success">{successMessage}</div>}

      <div className="types-list">
        <h2>Your Expenses</h2>
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              {editingId === expense.id ? (
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
                    <button onClick={() => handleUpdateExpense(expense.id)}>Save</button>
                    <button className="cancel" onClick={() => { setEditingId(null); setEditingAmount(''); setEditingDescription(''); }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <span>${expense.amount}</span>
                  <span>({expenseTypes.find(type => type.id === expense.expenseTypeId)?.name || 'Unknown'})</span>
                  <span><strong>Note:</strong> {expense.notes}</span>
                  <span><strong>Date:</strong> {new Date(expense.createdAt).toLocaleDateString()}</span>
                  <div>
                    <button onClick={() => { setEditingId(expense.id); setEditingAmount(expense.amount.toString()); setEditingDescription(expense.notes || ''); }}>Edit</button>
                    <button className="cancel" onClick={() => handleDeleteExpense(expense.id)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="add-expense">
        <h2>Add New Expense</h2>
        <div className="form-group">
          <label htmlFor="expenseType">Expense Type</label>
          <select
            id="expenseType"
            value={selectedExpenseType ?? ''}
            onChange={(e) => setSelectedExpenseType(Number(e.target.value))}
          >
            <option value="" disabled>Select an expense type</option>
            {expenseTypes.map((type) => (
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

        <button onClick={handleAddExpense} className="inputButton">Add Expense</button>
      </div>
    </div>
  );
};

export default ExpenseManager;
