// src/index.ts
import express from 'express';
import db from "./config/db.config";
import User from './model/User';
import Budget from './model/Budget';
import ExpenseType from './model/ExpenseType';
import Expense from './model/Expense';
import IncomeType from './model/IncomeType';
import Income from './model/Income';
import SavingType from './model/SavingType';
import Saving from './model/Saving';

const app = express();
const port = 3000;




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});