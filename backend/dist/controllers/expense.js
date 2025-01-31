"use strict";
// import Expense from "../models/expense"
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteExpense = exports.updateExpense = exports.getExpenses = exports.createExpense = void 0;
// const addItem=async(req: any,res: any)=>{
//     const {amount,category,date,description}=req.body;
//     try{
//         const expense= new Expense({
//              amount,category,date,description
//         })
//         await expense.save();
//         res.status(200).json({msg:"Expense added successfully"})
//     }catch(e:any){
//         res.status(400).json({msg:"Error in adding expense"})
//     }
// }
// const getExpense=async(req: any,res: any)=>{
// }
const expense_1 = __importDefault(require("../models/expense"));
const createExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount, category, date, description } = req.body;
    try {
        const expense = new expense_1.default({ amount, category, date, description });
        console.log(expense);
        yield expense.save();
        return res.status(201).json(expense);
        console.log("didnt reach here");
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.createExpense = createExpense;
const getExpenses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const expenses = yield expense_1.default.find();
        return res.json(expenses);
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.getExpenses = getExpenses;
const updateExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { amount, category, date, description } = req.body;
    try {
        const expense = yield expense_1.default.findByIdAndUpdate(id, { amount, category, date, description }, { new: true });
        if (!expense)
            return res.status(404).json({ message: 'Expense not found' });
        return res.json(expense);
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.updateExpense = updateExpense;
const deleteExpense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const expense = yield expense_1.default.findByIdAndDelete(id);
        if (!expense)
            return res.status(404).json({ message: 'Expense not found' });
        return res.status(200).json({ message: 'Expense deleted successfully' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.deleteExpense = deleteExpense;
