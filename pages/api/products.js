//import products from '../../static/products.json';
import connectDB from '../../utils/connectDB';
import Product from '../../models/Product';
connectDB();
export default async (req, res) =>{
    const {page,size}=req.query
    const pageNum=Number(page)
    const pageSize=Number(size)
    const totalDocs=await Product.countDocuments()
    const totalPages=Math.ceil(totalDocs/pageSize)
    let products=[];
    if(pageNum===1){
        products=await Product.find().limit(pageSize)
    }else{
        const skips=pageSize*(pageNum - 1)
        products=await Product.find().skip(skips).limit(pageSize)
    }
    
    res.status(200).json({products,totalPages});
};