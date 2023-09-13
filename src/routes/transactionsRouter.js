import { Router } from 'express';
import {
    getTransactions,
    createTransaction,
    deleteTransaction,
} from '../controllers/transactionsController.js';
import { validateToken } from '../middlewares/validateTokenMiddleware.js';
import { validateTransaction } from '../middlewares/validateTransactionMiddleware.js';

const transactionsRouter = Router();

transactionsRouter.get('/transactions', validateToken, getTransactions);
transactionsRouter.post(
    '/transactions',
    validateToken,
    validateTransaction,
    createTransaction
);
transactionsRouter.delete('/transactions/:id', validateToken, deleteTransaction);

export default transactionsRouter;
