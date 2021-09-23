import mongoose from 'mongoose';
import shortid from 'shortid';
const { String , Number }=mongoose.Schema.Types;
const productSchema=new mongoose.Schema({
    name:{
        type : String,
        required:true
    },
    price:{
        type : Number,
        required:true
    },
    sku:{
        type : String,
        unique:false,
        default:shortid.generate()
    },
    description:{
    type : String,
    required:true
    },
    mediaURL:{
        type : String,
        required:true
    },
    
});

export default mongoose.models.Product ||
mongoose.model("Product",productSchema);