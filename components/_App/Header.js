import Link from'next/link';
import {useRouter} from 'next/router';;
import {Menu,Container,Image,Icon} from 'semantic-ui-react';
import {handlelogout} from '../../utils/auth'

function Header({user}) {
  const router=useRouter();
  const isRoot=user&&user.role==="root";
  const isAdmin=user&&user.role==="admin";
  const isRootOrAdmin=isRoot || isAdmin;
  const isActive=(route)=>{
    return route===router.pathname;
  }

  return (
    <Menu stackable fluid inverted id="menu">
      <Container>
        <Link href="/">
          <Menu.Item header active={isActive('/')}>
            <Image 
            size="mini"
            src="/static/logo.svg"
            style={{marginRight:'1rem'}}
            />
            E-commerce
          </Menu.Item>
        </Link>
        <Link href="/cart">
          <Menu.Item header active={isActive('/cart')}>
            <Icon 
            name="cart"
            size="large"
            />
            Cart
          </Menu.Item>
        </Link>
        {
         isRootOrAdmin && <Link href="/create" >
          <Menu.Item header active={isActive('/create')}>
            <Icon 
            name="add square"
            size="large"
            />
            Create
          </Menu.Item>
        </Link>
        } 
        {user && (<>
        <Link href="/account">
          <Menu.Item header  active={isActive('/account')}>
            <Icon 
            name="user"
            size="large"
            />
            Account
          </Menu.Item>
        </Link>
          </>
        )

         
        }
        {user ?(
          <>
         <Menu.Item header onClick={handlelogout}>
            <Icon 
            name="sign out"
            size="large"
            />
            Logout
          </Menu.Item>
          </>):(
               <>
               <Link href="/login" >
               <Menu.Item header active={isActive('/login')}>
                 <Icon 
                 name="sign in"
                 size="large"
                 />
                 Login
               </Menu.Item>
             </Link>
             <Link href="/signup">
               <Menu.Item header  active={isActive('/signup')}>
                 <Icon 
                 name="signup"
                 size="large"
                 />
                 Signup
               </Menu.Item>
             </Link>
             </>
          )
          }
      </Container>
    </Menu>
  )
}

export default Header;
