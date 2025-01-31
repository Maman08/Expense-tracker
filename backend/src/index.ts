import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import connectDB from './utils/index'
import authRoutes from './routes/index'
dotenv.config()
const app=express();
const PORT=8000

app.use(express.json())
app.use(cors());
app.use(cookieParser());

connectDB();

app.get('/',(req,res)=>{
   res.send('hello ')
})
app.use('/api', authRoutes);

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})