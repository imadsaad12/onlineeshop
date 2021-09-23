import { Button, Header, Modal } from "semantic-ui-react";
import {useState} from 'react';
import axios from 'axios'
import baseURL from '../../utils/baseUrl';
import {useRouter} from 'next/router';

function ProductAttributes({description,_id,user}) {
const [modal,setmodal]=useState(false);
const router=useRouter();
const isRoot=user&&user.role==="root";
const isAdmin=user&&user.role==="admin";
const isRootOrAdmin=isRoot || isAdmin;

const handleDelete=async()=>{
  const url=  `${baseURL}/api/product`;
  const payload={params:{_id}};
  await axios.delete(url,payload);
  router.push("/")

}
  return <>
  <Header as="h3">About this Product</Header>
  <p>{description}</p>
  {isRootOrAdmin && <>
  <Button 
  icon="trash alternate outline"
  color="red"
  content="Delete Product"
  onClick={()=>setmodal(true)}
  />
  <Modal open={modal} dimmer="blurring">
  <Modal.Header>Confirm delete</Modal.Header>
  <Modal.Content>
    <p>Are you sure you want to delete this product ?</p>
    <Modal.Actions>
  <Button content="Cancel"
   onClick={()=>setmodal(false)}
   />

  <Button 
    negative
    icon="trash"
    labelPosition="right"
    content="Delete"
    onClick={handleDelete}
    />
    </Modal.Actions>

  </Modal.Content>
  </Modal>
</>
}
  </>;
}

export default ProductAttributes;
