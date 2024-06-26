import { Router } from 'express';
import UserController from '../controller/userController';

const router = Router();

router.post('/signup', UserController.signUp);
router.post('/login', UserController.login);

export default router;
