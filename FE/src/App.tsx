import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import IncomeTypeManager from './pages/incomType/IncomeTypesManager';
import ExpenseTypeManager from './pages/expenseType/expenseTypesManager';
import PrivateRoute from './privateRoute';

function App() {

  return (
    <>
      <Routes>
        <Route path="/login" element={< Login />} />
        <Route path="/register" element={< Register />} />
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/incomType" element={<IncomeTypeManager />} />
          <Route path="/expenseType" element={<ExpenseTypeManager />} />
        </Route>
      </Routes>
    </>
  )
}

export default App