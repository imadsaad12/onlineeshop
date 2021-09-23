import CartItemList from '../components/Cart/CartItemList'
import CartSummary from '../components/Cart/CartSummary'
import {Segment} from 'semantic-ui-react'
import {parseCookies} from 'nookies' 
import baseURL from '../utils/baseUrl'
import axios from 'axios';
import {useEffect, useState} from 'react'
import cookie from 'js-cookie'


function Cart({products,user}) {
  const [cartProducts,setCartProducts]=useState(products)
  const [success,setSuccess]=useState(false)
  const [loading,setLoading]=useState(false)
  async function handleRmoveFromCart(productId){
    const url=`${baseURL}/api/cart`
    const token=cookie.get('token')
    const payload={
      params:{
        productId
      },
      headers:{
        Authorization:token
      }
    }
    const res=await axios.delete(url,payload)
    setCartProducts(res.data)
  }

  const handleCheckout=async(paymentData)=>{
    try{
      setLoading(true)
      const url=`${baseURL}/api/checkout`
      const token=cookie.get('token')
      const payload={paymentData}
      const headers={headers:{Authorization:token}}
      const res=await axios.post(url,payload,headers)
      setSuccess(true)
      setLoading(false)


    }catch(err){
      console.log(err)
    }
  }



  return (
      <Segment loading={loading}>
        <CartItemList 
        user={user} 
        products={cartProducts}
        handleRmoveFromCart={handleRmoveFromCart}
        success={success}
        />
        <CartSummary
         success={success}
        products={cartProducts} handleCheckout={handleCheckout}/>
      </Segment>
  );
}

export default Cart;

Cart.getInitialProps=async(ctx)=>{
  const {token}=parseCookies(ctx);
  if(!token){
    return{products:[]};
  }
  const url= `${baseURL}/api/cart`
  const payload={headers:{Authorization:token}} 
  const res=await axios.get(url,payload);
  console.log(res.data)
  return {products:res.data}
}