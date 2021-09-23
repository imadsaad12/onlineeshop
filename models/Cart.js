import mongoose from 'mongoose'
import Product from '../models/Product'
const {ObjectId,Number}=mongoose.Schema.Types;
const cartSchema=new mongoose.Schema({
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
    ]
})
export default mongoose.models.Cart || mongoose.model("Cart",cartSchema)