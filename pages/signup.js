import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react'
import axios from 'axios'
import baseURL from '../utils/baseUrl';
import {handlelogin} from '../utils/auth'

const INITIAL_USER={
  name:"",
  email:"",
  password:""
}
function Signup() {
 
  const [user,setUser]=useState(INITIAL_USER);
  const [disabled,setDisabled]=useState(false);
  const [Loading,setLoading]=useState(false);

  useEffect(()=>{
    const isuser=Object.values(user).every(el=>Boolean(el));
    isuser?setDisabled(false) : setDisabled(true);
  });
  
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setUser(prevstate=>({...prevstate,[name]:value}))
    console.log(user);
  }

  const handleSubmit=async(e)=>{
      e.preventDefault();
    try{
        setLoading(true);
        const payload={...user}
        const res=await axios.post( `${baseURL}/api/signup`,payload)
        console.log(res.data);
        handlelogin(res.data)
      }catch(err){
      console.log(err)
    }
    finally{
      setLoading(false); 
    }
  }

  return <>
    <Message 
    attached
    header="Get Started !"
    icon="settings"
    content="Create a new account"
    color="teal"
    />
    <Form onSubmit={handleSubmit} loading={Loading}>
      <Segment>
        <Form.Input 
        fluid
        icon="user"
        iconPosition="left"
        label="Name"
        placeholder="Name"
        name="name"
        onChange={handleChange}
        value={user.name}
        />
        <Form.Input 
        fluid
        icon="envelope"
        iconPosition="left"
        label="Email"
        placeholder="Email"
        type="email"
        name="email"
        onChange={handleChange}
        value={user.email}
        />
        <Form.Input 
        fluid
        type="password"
        icon="lock"
        iconPosition="left"
        label="Password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
        value={user.password}
        />
        <Button
        icon="signup"
        type="submit"
        color="orange"
        content="Signup"
        disabled={disabled || Loading}
        />

      </Segment>
    </Form>
    <Message attached="bottom" warning>
      <Icon name="help"/>
      Existing user?{" "}
      <Link href="/login">
        <a>Log in here</a>
      </Link>{" "}instead
    </Message>
  </>;
}

export default Signup;
