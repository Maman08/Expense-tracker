import express from 'express';
import { createExpense, getExpenses, updateExpense, deleteExpense } from '../controllers/expense';

const router = express.Router();

router.post('/expense', createExpense);
router.get('/expenses', getExpenses);
router.put('/expense/:id', updateExpense);
router.delete('/expense/:id', deleteExpense);

export default router;
