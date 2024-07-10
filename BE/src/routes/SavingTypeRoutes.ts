import { Router } from 'express';
import savingTypeController from '../controller/savingTypeController';

const router = Router();

router.post('/addSavingType', savingTypeController.addSavingType);
router.post('/updateSavingType/:id', savingTypeController.updateSavingType);
router.delete('/deleteSavingType/:id', savingTypeController.deleteSavingType);
router.get('/getAllNonDeletedSavingTypes', savingTypeController.getAllNonDeletedSavingTypes);

export default router;
