import User from '../../models/User'
import jwt from 'jsonwebtoken'

export default async(req,res)=>{
    try{
        const {userId}=jwt.verify(req.headers.authorization,
            process.env.JWT_SECRET)
        const users=await User.find({_id:{$ne:userId}})   // $ne : not equal  
          res.status(200).json(users)  
    }
    catch(err){
        console.log(err)
    }
}