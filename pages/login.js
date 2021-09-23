import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button, Form, Icon, Message, Segment } from 'semantic-ui-react'
import baseURL from '../utils/baseUrl'
import axios from 'axios'
import {handlelogin} from '../utils/auth';
const INITIAL_USER={
  email:"",
  password:""
}
function Login() {
  const [user,setUser]=useState(INITIAL_USER);
  const [disabled,setDisabled]=useState(false);
  useEffect(()=>{
    const isuser=Object.values(user).every(el=>Boolean(el));
    isuser?setDisabled(false) : setDisabled(true);
  });
  const [Loading,setLoading]=useState(false);
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setUser(prevstate=>({...prevstate,[name]:value}))
    console.log(user);
  }
  const handleSubmit=async(e)=>{
      e.preventDefault();
    try{
        setLoading(true);
        const url=`${baseURL}/api/login`
        const payload={...user};
        const res=await axios.post(url,payload);
        handlelogin(res.data);
        setLoading(false)
    }catch(err){
      alert("Please enter a valid account !!")
      setLoading(false)
    }
  }

  return <>
    <Message 
    attached
    header="Welcome back !"
    icon="privacy"
    content="Login with email and password"
    color="blue"
    />
    <Form onSubmit={handleSubmit} loading={Loading}>
      <Segment>
       
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
        icon="sign in"
        type="submit"
        color="orange"
        content="Login"
        disabled={disabled || Loading}
        />

      </Segment>
    </Form>
    <Message attached="bottom" warning>
      <Icon name="help"/>
      New user?{" "}
      <Link href="/signup">
        <a>Sign up here</a>
      </Link>{" "}instead
    </Message>
  </>;
}

export default Login;
