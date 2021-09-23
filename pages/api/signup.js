import connectDB from '../../utils/connectDB';
import User from '../../models/User';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import isEmail from 'validator/lib/isEmail'
import isLength from 'validator/lib/isLength';
import Cart from '../../models/cart'
connectDB();
export default async(req,res)=>{
    const {name,email,password}=req.body
    //check the validity of the input
    if(!isLength(name,{min:3,max:10})){
        return res.status(422).send("Name must be 3-10 characters long")
    }
    else if(!isLength(password,{min:6})){
        return res.status(422).send("Password must be at least 6 characters")
    }
    else if(!isEmail(email)){
        return res.status(422).send("Email must be valid")
    }
    //1) check if user already exist
    const user =await User.findOne({email});
    if(user){
        return res.status(422).send(`User already exists with email ${email}`);
    }

    //2)if not hash their password
    const hash=await bcrypt.hash(password,10);
    //3))create user
    const newuser=await new User({
        name,
        email,
        password:hash
    }).save()
    // create cart for new user
    await new Cart ({user:newuser._id}).save(); 
    //4)create token for the new user
    const token =jwt.sign({userId:newuser._id},process.env.JWT_SECRET,{
        expiresIn:'7d'
    })
    res.status(201).json(token)
    //5)send back token
}