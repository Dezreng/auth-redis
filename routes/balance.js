import { Router } from 'express';
import { authGuard } from '../middleware/authGuard.js';
import { getBalance } from '../controllers/balance.controller.js'

const balanceRouter = Router();

balanceRouter.get('/', authGuard, getBalance);

export { balanceRouter };
