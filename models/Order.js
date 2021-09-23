import mongoose from 'mongoose'
import Product from '../models/Product'
const {ObjectId,Number}=mongoose.Schema.Types;
const orderSchema=new mongoose.Schema({
    user:{
        type:ObjectId,
        ref:"User"
    },
    products:[
        {
          product:{
            type:ObjectId,
            ref:"Product"
          },
          quantity:{
              type:Number,
              default:1
          }
        }
    ],
    email:{
        type:String,
        required:true
    },
    total:{
        type:Number,
        required:true
    }
},{timestamps:true})
export default mongoose.models.Order || mongoose.model("Order",orderSchema)