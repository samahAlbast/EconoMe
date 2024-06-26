import { Router } from 'express';
import incomeTypeController from '../controller/incomeTypeController';

const router = Router();

router.post('/addIncomeType', incomeTypeController.addIncomeType);
router.post('/updateIncomeType/:id', incomeTypeController.updateIncomeType);

export default router;
