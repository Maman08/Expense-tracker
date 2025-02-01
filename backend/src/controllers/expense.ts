import Expense, { IExpense } from "../models/expense";

export const createExpense =async(req:any,res:any)=>{
  const{amount,category,date,description}=req.body;

  try{
    if(!req.user) return res.status(401).json({message:"Unauthorized"});
    console.log("userid",req.user.userId)
    const expense =new Expense({amount,category,date,description,userId: req.user.userId });
    console.log(expense)
    await expense.save();
    return res.status(201).json(expense);
    // console.log("didnt reach here")
  }catch(error){
    return res.status(500).json({ message:'Server error' });
  }
};

export const getExpenses=async(req:any,res:any)=>{
  try{
    if(!req.user) return res.status(401).json({message:"Unauthorized"});
    console.log("Hello",req.user.userId )
    const expenses = await Expense.find({userId: req.user.userId });
    return res.json(expenses);
  }catch(error){
    return res.status(500).json({ message: 'Server error' });
  }
};

export const updateExpense = async (req: any, res: any) => {
  const { id } = req.params;
  const { amount, category, date, description } = req.body;

  try {
    const expense = await Expense.findByIdAndUpdate(
      id,
      { amount, category, date, description },
      { new: true }
    );
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    return res.json(expense);
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};


export const deleteExpense = async (req: any, res: any) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findByIdAndDelete(id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });

    return res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};
