import User,{ IUser } from "../../models/user";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
const signin=async(req: any,res: any)=>{
    const {email,password}=req.body;
    try{
        const user =await User.findOne({email});
    if(!user){
       return res.status(400).json({message:"Invalid Credentials"})
    }
    const isPasswordValid=await bcrypt.compare(password,user.password)
    if(!isPasswordValid){
       return res.status(400).json({message:"Invalid Credentials"})
    }
    const token = jwt.sign({ userId: user._id,firstName:user.firstName }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
    return res.json({ message: 'Login successful', token });
    }
   catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }

}

export default signin