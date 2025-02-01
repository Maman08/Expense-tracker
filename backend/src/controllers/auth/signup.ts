import User from "../../models/user"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'



const signup=async(req: any,res: any)=>{
    const {firstName,lastName,email,password}=req.body;
    try{
        const userAlready=await User.findOne({email})
        if(userAlready){
            return res.status(400).json({message:"User already Exist"})
        }
        const hashedPassword=await bcrypt.hash(password,10);
        const user=new User({firstName,lastName,email,password:hashedPassword})
        await user.save();
        const token = jwt.sign({ userId: user._id,firstName:user.firstName}, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        return res.status(201).json({ message: 'User registered successfully' });
    }catch (error) {
        return res.status(500).json({ message: 'Server error' });
    }

}

 export default signup   