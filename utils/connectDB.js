import mongoose from 'mongoose';
const connection={};
const connectDB=async()=>{
    if(connection.isConnected){
        //use existing connection
        console.log("already connected");
        return;
    }
    //new connection
   const db=await mongoose.connect(process.env.MONGO_SRV,{
       useCreateIndex:true,
       useFindAndModify:false,
       useUnifiedTopology:true,
       useNewUrlParser:true
   });
   console.log("connected");
   connection.isConnected=db.connections[0].readyState;
}
export default connectDB;