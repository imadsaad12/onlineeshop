import {Header,Segment,Button, Icon, Item, Message} from 'semantic-ui-react'
import {useRouter} from 'next/router'
function CartItemList({products,user,handleRmoveFromCart,success}) {
  const router=useRouter()

const mapCartProductsToItem=(products)=>{
return products.map( p => ({
  childkey:p.product._id,
  header:(
    <Item.Header as="a" onClick={()=>router.push(`/product?_id=${p.product._id}`)}>
      {p.product.name}
    </Item.Header>
  ),
  image:p.product.mediaURL,
  meta:`${p.quantity} x $${p.product.price}`,
  fluid:"true",
  extra:(
    <Button
    basic
    icon="remove"
    floated="right"
    onClick={()=>handleRmoveFromCart(p.product._id)}
    />
  )
}))
}
  if(success){
    return <Message 
      success
      header="Success !"
      content="Your order and Payment has been accessed"
      icon="star outline"
    />
  }
  if(products.length===0){
  return (
    <Segment secondary color="teal" inverted textAlign="center" placeholder>
      <Header icon>
      <Icon name="shopping basket"/>
      No products in your cart . Add some !
      </Header>
      <div>
        {
          user?(
            <Button color="orange" onClick={()=>{router.push("/")}} content="View Product"/>):
          (
            <Button color="blue" onClick={()=>{router.push("/login")}} content="Login to Add Products"/>
          )
        }
        </div>
    </Segment>
  )
}
return <Item.Group divided items={mapCartProductsToItem(products)}/> 
}

export default CartItemList;
