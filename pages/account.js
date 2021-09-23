import AccountHeader from '../components/Account/AccountHeader'
import AccountOrders from '../components/Account/AccountOrders'
import AccountPermissions from '../components/Account/AccountPermissions'
import { parseCookies } from 'nookies'
import baseURL from '../utils/baseUrl'
import axios from 'axios'

function Account({user,orders}) {
  return (<>
    <AccountHeader {...user}/>
    <AccountOrders orders={orders}/>
    {user.role ==='root' && <AccountPermissions />}
  </>)
}

Account.getInitialProps=async (ctx)=>{
const { token } =parseCookies(ctx)
const payload={headers:{ Authorization : token}}
const url=`${baseURL}/api/orders`
const res= await axios.get(url,payload)
return res.data
}
export default Account;
