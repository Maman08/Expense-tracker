"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const expense_1 = require("../controllers/expense");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const router = express_1.default.Router();
router.post('/expense', authMiddleware_1.authMiddleware, expense_1.createExpense);
router.get('/expenses', authMiddleware_1.authMiddleware, expense_1.getExpenses);
router.put('/expense/:id', expense_1.updateExpense);
router.delete('/expense/:id', expense_1.deleteExpense);
exports.default = router;
