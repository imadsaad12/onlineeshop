import User from '../../models/User'
import jwt from 'jsonwebtoken'
import connectDB from '../../utils/connectDB';

connectDB();
export default async(req,res)=>{
    switch (req.method) {
        case "GET":
            await handleGetRequest(req,res);
            break;
        case "PUT":
            await handlePutRequest(req,res);
            break;
        default:
            res.status(405).send('Method not allowed')
            break;
    }
}



const handleGetRequest=async(req,res)=>{
    if(!(req.headers.authorization)){
        return res.status(401).send("No authorization Token");
    }
    const {userId}=jwt.verify(req.headers.authorization,process.env.JWT_SECRET)
    const user=await User.findOne({_id:userId});
    if(user){
        res.status(200).json(user)
    }
    else{
        res.status(404).send("user not found")
    }
}

const handlePutRequest=async(req,res)=>{
    const{_id,role}=req.body
    const user=await User.findOneAndUpdate({_id},{role})
    res.status(203).send('User Updated')
}