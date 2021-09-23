import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import Cart from '../../models/Cart'
import connectDB from '../../utils/connectDB'

connectDB();
const {ObjectId} =mongoose.Types
export default async (req,res)=>{
        switch (req.method) {
            case "GET":
                await handleGetRequest(req,res);
                break;
            case "PUT":
                await handlePutRequest(req,res);
                break;
            case "DELETE":
                await handleDeleteRequest(req,res);
               break;     
            default:
                res.status(405).send("Method not allowed")
                break;
        }
}

const handlePutRequest=async (req,res)=>{
    const {quantity,productId}=req.body;
    if(!(req.headers.authorization)){
        return res.status(401).send("No  auth token")
    }
    try{
        const {userId}=jwt.verify(req.headers.authorization,process.env.JWT_SECRET);
            //get user cart based on userId
            const cart=await Cart.findOne({user :userId})
            //check if product already exist in cart
            const productExists=cart.products.some(doc=>ObjectId(productId).equals(doc.product))
            //if so increment quantity (by number provided ro request)
            if(productExists){
                await Cart.findOneAndUpdate({_id:cart._id,"products.product":productId},
                {$inc:{"products.$.quantity":quantity}}
                )
            }
            else{
                const newProduct={quantity,product:productId}
                await Cart.findOneAndUpdate({_id:cart._id},{$addToSet:{products:newProduct}})
            }
            res.status(200).send("Cart updated")
            //if not add new product with given quantity
    }catch(err){
        console.log(err)
    }
}

const handleGetRequest=async (req,res)=>{
    if(!(req.headers.authorization)){
        return res.status(401).send("No  auth token")
    }
    try{
        const {userId}=jwt.verify(req.headers.authorization,process.env.JWT_SECRET);
        const cart=await Cart.findOne({user :userId}).populate({
            path:"products.product",//path to what we want to populate
            model:"Product"//to what model it refer (3adtn nafe ta3ol ref le bel model cart)
        })
        res.status(200).json(cart.products)
    }catch(err){
        console.log(err)
    }
}

const handleDeleteRequest=async(req,res)=>{
    const {productId} = req.query //not req.body because we send it as params frpm cart page
    if(!(req.headers.authorization)){
        return res.status(401).send("No  auth token")
    }
    try{
        const {userId}=jwt.verify(req.headers.authorization,process.env.JWT_SECRET);
        const cart=await Cart.findOneAndUpdate(
            { user :userId },
            {$pull:{products:{product:productId}}},
            {new:true}
            ).populate({
                path:"products.product",//path to what we want to populate
                model:"Product"//to what model it refer (3adtn nafe ta3ol ref le bel model cart)
            })
           res.json(cart.products) 
    }catch(err){
        console.log(err)
    }   
}