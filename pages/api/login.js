import connectDB from '../../utils/connectDB';
import User from '../../models/User';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
connectDB();
export default async(req,res)=>{
    const {email,password}=req.body
    
    //1) check if user already exist with the provided password
    const user =await User.findOne({email}).select('+password');
    
    //2)if not return error
    if(!user){
        return res.status(404).send(`No user exists with email ${email}`);
    }
    //3)check if users password matches the one in db
        const passwordMatch=await bcrypt.compare(password,user.password)
    //4)if so,generate a token
    if(passwordMatch){
        const token=  jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
        //5)send back the token to the client
        res.status(200).json(token)
    } 
    else{
        res.status(401).send("password do not matches")
    }
}