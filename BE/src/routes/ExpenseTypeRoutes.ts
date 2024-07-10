import { Router } from 'express';
import expenseTypeController from '../controller/expenseTypeController';

const router = Router();

router.post('/addExpenseType', expenseTypeController.addExpenseType);
router.post('/updateExpenseType/:id', expenseTypeController.updateExpenseType);
router.delete('/deleteExpenseType/:id', expenseTypeController.deleteExpenseType);
router.get('/getAllNonDeletedExpenseTypes', expenseTypeController.getAllNonDeletedExpenseTypes);

export default router;
