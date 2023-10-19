import { Router } from 'express';
import {
  createAccount,
  login,
} from '../controllers/auth.controller.js';

const authRouter = Router();

authRouter.post('/signup', createAccount);
authRouter.post('/', login);

export { authRouter };