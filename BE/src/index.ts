// src/index.ts
import express from 'express';
import db from "./config/db.config";
import User from './model/User';
import Budget from './model/Budget';
import ExpenseCategory from './model/ExpenseCategory';
import ExpenseTransaction from './model/ExpenseTransaction';
import IncomeCategory from './model/IncomeCategory';
import IncomeSource from './model/IncomeSource';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});