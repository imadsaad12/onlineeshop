import { Button, Divider, Segment } from 'semantic-ui-react'
import {useState,useEffect} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import claculateCartTotal from '../../utils/calculateCartTotal'
function CartSummary({products,handleCheckout,success}) {

const [isCartEmpty,setCartEmpty]=useState(false);
const [cartAmount,setCartAmount]=useState(0)
const [stripeAmount,setStripeAmount]=useState(0)

useEffect(()=>{
  const {cartTotal,stripeTotal}=claculateCartTotal(products)
  setCartEmpty(products.length===0);
  setCartAmount(cartTotal)
  setStripeAmount(stripeTotal)
},[products])

  return <>
    <Divider/>
    <Segment clearing size="large">
      <strong>Sub total :</strong>${cartAmount}
      <StripeCheckout
      name="React Reserve"
      amount={stripeAmount}
      image={products.lenght>0?products[0].product.mediaURL:""}
      currency="USD"
      shippingAddress={true}
      billingAddress={true}
      zipCode={true}
      token={handleCheckout}
      triggerEvent="onClick"
      stripeKey="pk_test_51IpwcDKr5iNTEsn7qEJ3Rhhj0gqu8Mqo4I0gjqqEmk5LV8ZmAlsP5CNDoCw65j8klxUZzjNJc4MFqn0PkcMuftDb00H9uLt7Y2"
      >
      <Button disabled={isCartEmpty||success} 
      icon="cart"
      color="teal"
      floated="right"
      content="Chekout"
      />
      </StripeCheckout>
      
    </Segment>
  </>
}

export default CartSummary;
