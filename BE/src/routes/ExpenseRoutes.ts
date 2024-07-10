
import { Router } from 'express';
import ExpenseController from '../controller/expenseController';

const router = Router();

router.post('/addExpense', ExpenseController.addExpense);
router.post('/updateExpense/:id', ExpenseController.updateExpense);
router.delete('/deleteExpense/:id', ExpenseController.deleteExpense);
router.get('/getAllExpenses', ExpenseController.getAllExpenses);

export default router;
