import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectDB from './utils/index'
import authRoutes from './routes/index'
import expenseRoutes from './routes/expenseroute'
dotenv.config()
const app=express();
const PORT=8000


app.use((req:any, res:any, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://expense-tracker-orcin-five.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });
app.use(express.json())
app.use(cookieParser());
connectDB();

app.get('/',(req,res)=>{
   res.send('hello ')
})
app.get('/test',(req,res)=>{
    res.send('hello test')
 })
app.use('/api', authRoutes);
app.use('/api', expenseRoutes);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})


