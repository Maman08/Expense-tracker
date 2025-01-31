// import Expense from "../models/expense"


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


import Expense, { IExpense } from "../models/expense";

export const createExpense = async (req: any, res: any) => {
  const { amount, category, date, description } = req.body;

  try {
    const expense = new Expense({ amount, category, date, description });
    console.log(expense)
    await expense.save();
    return res.status(201).json(expense);
    console.log("didnt reach here")
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const getExpenses = async (req: any, res: any) => {
  try {
    const expenses = await Expense.find();
    return res.json(expenses);
  } catch (error) {
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
