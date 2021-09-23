import React from 'react';
import axios from 'axios';
import ProductList from "../components/Index/ProductList";
import ProductPagination from "../components/Index/ProductPagination";
import baseURL from '../utils/baseUrl'; 
function Home({products,totalPages}) {
 
  return (<>
    <ProductList products={products}/>
    <ProductPagination totalPages={totalPages}/>
    </>
  );
}

Home.getInitialProps= async(ctx)=>{
  const page=ctx.query.page ? ctx.query.page : "1"
  const url= `${baseURL}/api/products`;
  const size=9
  const payload={params:{page,size}}
  const res=await axios.get(url,payload);
  return res.data;
}

export default Home;
