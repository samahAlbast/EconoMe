import { Router } from 'express';
import incomeTypeController from '../controller/incomeTypeController';

const router = Router();

router.post('/addIncomeType', incomeTypeController.addIncomeType);
router.post('/updateIncomeType/:id', incomeTypeController.updateIncomeType);
router.delete('/deleteIncomeType/:id', incomeTypeController.deleteIncomeType);
router.get('/getAllNonDeletedIncomeTypes', incomeTypeController.getAllNonDeletedIncomeTypes); 

export default router;
