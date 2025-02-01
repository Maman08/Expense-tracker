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


const corsOptions = {
    origin: ['https://expense-tracker-orcin-five.vercel.app',"http://localhost:5173",], 
    credentials: true,
  };
  
app.use(cors(corsOptions));
  
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


