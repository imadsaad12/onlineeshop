import App from "next/app";
import Layout from '../components/_App/Layout'
import {parseCookies,destroyCookie} from 'nookies'
import {redirectUser} from '../utils/auth'
import baseURL from '../utils/baseUrl'
import axios from 'axios'
class MyApp extends App {

  static async getInitialProps({Component,ctx}){
    const {token}=parseCookies(ctx)
    let pageProps={};

    if(Component.getInitialProps){

      pageProps=await Component.getInitialProps(ctx);

    }
    if(!token){
      const isProtectedRoute=ctx.pathname==='/account'||ctx.pathname==='/cart'
      if(isProtectedRoute){
        redirectUser(ctx,'/login');
      }
    }else{
      try{
        const payload={headers:{Authorization:token}}
        const url=`${baseURL}/api/account`
        const res=await axios.get(url,payload)
        const user=res.data;
        const isRoot=user.role==='root';
        const isAdmin=user.role==='admin';
        const isNotPermitted=!(isRoot||isAdmin) && ctx.pathname==='/create'
        pageProps.user=user;
        if(isNotPermitted){
          redirectUser(ctx,'/')
        }
      }catch(error){
        destroyCookie(ctx,"token");
        redirectUser(ctx,"/login")
      }
    }
    return{pageProps};
  }

  render() {
    const { Component,pageProps } = this.props;
    return(
      <Layout {...pageProps}>
        <Component {...pageProps}/>
      </Layout>
    )
  }
}

export default MyApp;
