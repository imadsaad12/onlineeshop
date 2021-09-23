import {Form,Input,TextArea,Button,Image,Message,Header,Icon, FormGroup} from 'semantic-ui-react'
import {useState,useEffect} from 'react';
import axios from 'axios';
import baseURL from '../utils/baseUrl';
const INITIAL_PRODUCT={
    name:"",
    price:" ",
    media:"",
    description:" " 
}
function CreateProduct() {
  const [product,setproduct]=useState(INITIAL_PRODUCT);
  const [success,setsuccess]=useState(false);
  const [mediaPreview,setmediaPreview]=useState('');
  const [loading,setLoading]=useState(false);
  const [disabled,setDisabled]=useState(true)

  useEffect(()=>{
    const isProduct=Object.values(product).every(el=>Boolean(el))
    isProduct ? setDisabled(false) : setDisabled(true)
  })

  const handleChange=(e)=>{
    e.preventDefault();
    const {name,value,files}=e.target;
    if(name=="media"){
      setproduct((prevstate)=>({...prevstate,media:files[0]}))
      setmediaPreview(window.URL.createObjectURL(files[0]))
    }
    
    else{
      setproduct((prevstate)=>({...prevstate,[name]:value}));
      console.log(product);
    }

  }

  const handleSubmit=async(e)=>{
    e.preventDefault();
    const mediaURL=await handlingImageUPload();
    setLoading(true);
    console.log({mediaURL})
    const url=`${baseURL}/api/product`
    const payload={...product,mediaURL}
    const res=await axios.post(url,payload);
    setLoading(false);
    console.log({res});
    setproduct(INITIAL_PRODUCT);
    setsuccess(true);
  }

  const handlingImageUPload= async()=>{
    const data=new FormData()
    data.append('file',product.media)
    data.append('upload_preset','imadproject')
    const res=await axios.post(process.env.CLOUDINARY_URL,data)
    const mediaURL=res.data.url;
    return mediaURL;
    
  }
  return <>
    <Header as="h2" block >
      <Icon name="add" color="orange"/>
      Create New Product
      </Header>
      <Form loading={loading} success={success} onSubmit={handleSubmit}>
        <Message 
        success 
        icon="check"
        header="Success!"
        content="your product has been posted"
        />
        <Form.Group widths="equal">
          <Form.Field
           control={Input}
           name="name"
           label="Name"
           placeholder="Name"
           type="text"
           onChange={handleChange}
           value={product.name}
          />
           <Form.Field
            control={Input}
           name="price"
           label="Price"
           placeholder="Price"
           type="number"
           min="0.00"
           step="0.1"
           onChange={handleChange}
           value={product.price}
          />
           <Form.Field
            control={Input} 
           name="media"
           label="Media"
           content="Select Image"
           type="file"
           accept="image/*"
           onChange={handleChange}
          />
          </Form.Group>
          <Image src={mediaPreview} 
          rounded
           centered 
           size="small"/>

           <Form.Field
           control={TextArea} 
           name="description"
           label="Description"
           placeholder="Description"
           onChange={handleChange}
           value={product.description}
          />
           <Form.Field
           control={Button} 
           color="blue"
           label="Name"
           icon="pencil alternate"
           content="submit"
           type="submit"
           disabled={loading || disabled}
          />
        
      </Form>
  </>;
}

export default CreateProduct;
