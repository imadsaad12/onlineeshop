import {Input} from 'semantic-ui-react'
import {useState,useEffect} from 'react'
import {useRouter} from 'next/router'
import axios from 'axios'
import baseURL from '../../utils/baseUrl'
import cookie from 'js-cookie'

function AddProductToCart({user,productId}) {
  const router=useRouter();
  const [quantity,setQuantity]=useState(1);
  const [loading,setLoading]=useState(false);
  const [success,setSuccess]=useState(false);
  useEffect(()=>{
    let timeout;
    if(success){
      timeout=setTimeout(() => {
          setSuccess(false)
      }, 3000);
    }
    return ()=>{
      clearTimeout(timeout)
    }
  },[success])

  const handleAddProductToCart=async()=>{
    setLoading(true)
    const url=`${baseURL}/api/cart`
    const payload={quantity,productId};
    const token=cookie.get('token');
    const headers={headers:{authorization:token}}
    const res=await axios.put(url,payload,headers)
    setSuccess(true)
    setLoading(false);

  }

  return <Input 
  type="number"
  min="1"
  placeholder="Quantity"
  onChange={e=>(setQuantity(Number(e.target.value)))}
  value={quantity}
  action={
    user && success ?{
      color:'blue',
      content:"Item Added",
      icon:"plus cart",
      disabled:true
    }:
    user ? {
    color:"orange",
    content:"Add to Cart",
    icon: "plus cart",
    loading,
    disabled:loading,
    onClick:()=>handleAddProductToCart()
  }:{
    color:'blue',
    content:'sign Up To Purchase',
    icon:'signup',
    onClick:()=>router.push("/")
  }}
  />;
}

export default AddProductToCart;
