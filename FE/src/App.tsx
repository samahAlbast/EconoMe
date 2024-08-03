// src/App.tsx
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import IncomeTypeManager from './pages/incomType/IncomeTypesManager';
import ExpenseTypeManager from './pages/expenseType/expenseTypesManager';
import Income from './pages/income/income';
import Expense from './pages/expense/expense';
import PrivateRoute from './privateRoute';
import MainLayout from './mainLayout';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/income"
          element={
            <MainLayout>
              <Income />
            </MainLayout>
          }
        />
        <Route
          path="/expense"
          element={
            <MainLayout>
              <Expense />
            </MainLayout>
          }
        />
        <Route
          path="/incomeType"
          element={
            <MainLayout>
              <IncomeTypeManager />
            </MainLayout>
          }
        />
        <Route
          path="/expenseType"
          element={
            <MainLayout>
              <ExpenseTypeManager />
            </MainLayout>
          }
        />
      </Route>
    </Routes>
  );
}

export default App;