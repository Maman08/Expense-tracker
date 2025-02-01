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

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(cookieParser());

connectDB();

app.get('/',(req,res)=>{
   res.send('hello ')
})
app.use('/api', authRoutes);
app.use('/api', expenseRoutes);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})