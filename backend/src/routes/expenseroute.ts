import express from 'express';
import { createExpense, getExpenses, updateExpense, deleteExpense } from '../controllers/expense';
import {authMiddleware} from "../middlewares/authMiddleware";
const router = express.Router();

router.post('/expense', authMiddleware,createExpense);
router.get('/expenses', authMiddleware,getExpenses);
router.put('/expense/:id', updateExpense);
router.delete('/expense/:id', deleteExpense);

export default router;
