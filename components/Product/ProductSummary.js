import { Item, ItemContent, ItemDescription, ItemHeader, Label, ItemExtra } from 'semantic-ui-react';
import AddProductToCart from './AddProductToCart';
function ProductSummary({name,mediaURL,_id,price,sku,user}) {
  return (
    <Item.Group>
      <Item>
        <Item.Image size="medium" src={mediaURL}/>
        <ItemContent>
          <ItemHeader>{name}</ItemHeader>
          <ItemDescription>
            <p>${price}</p>
            <Label>SKU:{sku}</Label>
          </ItemDescription>
          <ItemExtra>
            <AddProductToCart user={user} productId={_id}/>
          </ItemExtra>
        </ItemContent>
      </Item>
    </Item.Group>
  );
}

export default ProductSummary;
