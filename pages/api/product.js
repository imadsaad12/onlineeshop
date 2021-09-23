import Product from '../../models/Product';
import connectDB from '../../utils/connectDB';
connectDB();
export default async (req,res)=>{
    switch (req.method) {
        case "GET":
            await handleGetRequest(req,res);
            break;
        case "DELETE":
            await handleDeleteRequest(req,res);
            break;
        case "POST":
            await handlePostRequest(req,res);  
            break;  
        default:
            res.status(405).send(`Method not allowed`);
            break;
    }
}

 const handleGetRequest =async(req,res)=>{
    const {_id}=req.query;
    const product=await Product.findOne({_id:_id});
    res.status(200).json(product);
}

const handleDeleteRequest=async(req,res)=>{
    const {_id}=req.query;
    await Product.findOneAndDelete({_id});
    res.status(204).json({})
    //204 delete successful but no data to get back
}

const handlePostRequest=async(req,res)=>{
const {name,price,description,mediaURL}=req.body;
// if(!name||!price||!description||!mediaURL){
//     return res.status(422).send("Product missing one or more field !!");
// }
const product =await new Product({
    name,
    price,
    description,
    mediaURL
}).save()
res.status(201).json(product);
}