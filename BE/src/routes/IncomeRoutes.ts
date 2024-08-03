import { Router } from 'express';
import incomeController from '../controller/incomeController';

const router = Router();

router.post('/addIncome', incomeController.addIncome);
router.post('/updateIncome/:id', incomeController.updateIncome);
router.delete('/deleteIncome/:id', incomeController.deleteIncome);
router.get('/getIncome/:id', incomeController.getIncome);
router.get('/getAllNonDeletedIncomes', incomeController.getAllNonDeletedIncomes);
router.get('/getTotalAvailableIncome', incomeController.getTotalAvailableIncome);

export default router;
