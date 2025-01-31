import { Schema, model, Document } from "mongoose";

export interface IExpense extends Document {
    amount: number;
    category: string;
    date: Date;
    description?: string;
  }
const expenseSchema=new Schema<IExpense>({
    amount:{
        type:Number,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    date:{
        type:Date,
        required:true,
    },
    description:{
        type:String,
        required:false
    }
})
export default model<IExpense>('Expense', expenseSchema);