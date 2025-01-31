import mongoose from "mongoose";

const expenseSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true,
    },
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
module.exports=mongoose.model('expense',expenseSchema)