import ProductSummary from '../components/Product/ProductSummary'
import ProductAttributes from '../components/Product/ProductAttributes'
import AddProductToCart from '../components/Product/AddProductToCart'
import baseURL from '../utils/baseUrl';
import axios from 'axios';
function Product({product,user}) {
  return <>
    <ProductSummary user={user} {...product}/>
    <ProductAttributes user={user} {...product}/>
  </>;
}

Product.getInitialProps= async ({query:{_id}})=>{
  const Url=`${baseURL}/api/product`;
  const payload={params:{_id}};
  const res=await axios.get(Url,payload);
  return {product : res.data};

}
export default Product;
