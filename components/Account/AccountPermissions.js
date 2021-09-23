import axios from 'axios'
import baseURL from '../../utils/baseUrl'
import cookie from 'js-cookie'
import {Header,Checkbox,Table,Icon, TableHeader} from 'semantic-ui-react'
import {useState,useEffect, useRef} from 'react'
import formatDate from '../../utils/formatDate';

function AccountPermissions() {
  const [users,setusers]=useState([])
  useEffect(()=>{
    getUsers()
  },[])

const getUsers=async()=>{
  const url=`${baseURL}/api/users`
  const token=cookie.get('token') 
  const payload={headers:{authorization:token}}
  const res=await axios.get(url,payload)
  setusers(res.data)
}

  return <>
    <div style={{margin:'2em 0'}}>
      <Header as="h2">
        <Icon name="settings"/>
        User Permission
        </Header>
        <Table  celled definition>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell />
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Email</Table.HeaderCell>
            <Table.HeaderCell>Joined</Table.HeaderCell>
            <Table.HeaderCell>Upated</Table.HeaderCell>
            <Table.HeaderCell>Role</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {users.map(user=>(
            <UserPermission key={user._id} user={user}/>
          ))
          }
        </Table.Body>
        </Table>
    </div>
  
  </>;
}
function UserPermission({user}){
  const [admin,setAdmin]=useState(user.role==='admin')
  const isFirstRun=useRef(true)
  useEffect(()=>{
    if(isFirstRun.current){
      isFirstRun.current=false;
      return;
    }
    updatePermission()

  },[admin])

  const updatePermission=async()=>{
    const url=`${baseURL}/api/account`
    const payload={_id:user._id,role:admin? "admin" : "user"}
    const res=await axios.put(url,payload)

  }

  const handleChangePermission=()=>{
    setAdmin(prevState=>!prevState)
  }

  return(
    <Table.Row>
      <Table.Cell collapsing>
      <Checkbox checked={admin} toggle onChange={handleChangePermission}/>
      </Table.Cell>
     <Table.Cell>{user.name}</Table.Cell>
     <Table.Cell>{user.email}</Table.Cell> 
     <Table.Cell>{formatDate(user.createdAt)}</Table.Cell> 
     <Table.Cell>{formatDate(user.updatedAt)}</Table.Cell> 
     <Table.Cell>{admin ? "Admin":"User"}</Table.Cell>
    </Table.Row>
  )
}
export default AccountPermissions;
