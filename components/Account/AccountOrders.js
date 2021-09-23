import {Header , Accordion, Label, Segment,
   Icon, Image,Button, List } from 'semantic-ui-react'
import {useRouter} from 'next/router'
import formdate from '../../utils/formatDate'


function AccountOrders({orders}) {
const router=useRouter()
console.log(orders)
const mapOrdersToPanels=(orders)=>{
  return orders.map(order=>({
    key:order._id,
    title:{
      content:<Label color="blue" content={formdate(order.createdAt)} />
    },
    content:{
      content:(
        <>
        <List.Header as="h3">
        Total:${order.total}
        <Label 
        content={order.email}
        icom="mail"
        basic
        horizontal
        style={{marginLeft:'1em'}}
        />
        </List.Header>
        <List>
          {
           order.products.map((p)=>(
            <List.Item>
            <Image avatar src={p.product.mediaURL}/>
            <List.Content>
              <List.Header>{p.product.name}</List.Header>
              <List.Description>{p.quantity} .${p.product.price}</List.Description>
            </List.Content>
            <List.Content floated="right">
              <Label tag color="red" size="tiny">
                {p.product.sku}
              </Label>
            </List.Content>
            </List.Item>
            
          )
        )
      }
        </List>
        </>
      )
    }
  }))
  }

  return <>
    <Header as="h2" >
    <Icon 
    name="folder open"
    />
    Order History
    </Header>

    {
    (orders.length === 0) ?(
      <Segment inverted tertiary color="grey" textAlign="center">
        <Header icon>
          <Icon name="copy outline"/>
          No past oreders
          </Header>
          <div>
            <Button onClick={()=>{router.push('/')}} color="orange">
              View products
              </Button>
          </div>
      </Segment>
    ):(
      <Accordion 
      fluid
      styled
      exclusive={false}
      panels={mapOrdersToPanels(orders)}
      />
    )
    }
  </>
}

export default AccountOrders;
