import React from 'react';
import { NavLink } from 'react-router-dom';
import './sidebar.css';

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <NavLink to="/income" className={({ isActive }) => (isActive ? 'active' : '')}>Income</NavLink>
      <NavLink to="/expense" className={({ isActive }) => (isActive ? 'active' : '')}>Expense</NavLink>
      <NavLink to="/incomeType" className={({ isActive }) => (isActive ? 'active' : '')}>Income Types</NavLink>
      <NavLink to="/expenseType" className={({ isActive }) => (isActive ? 'active' : '')}>Expense Types</NavLink>
    </div>
  );
};

export default Sidebar;
