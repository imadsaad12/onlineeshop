import {Header,Icon,Segment,Label} from 'semantic-ui-react'

function AccountHeader({role,email,name,createdAt}) {
  return <>
  <Segment warning inverted color="violet">
  <Label 
    color="teal"
    size="large"
    ribbon
    icon="privacy"
    style={{textTransform:'capitalize'}}
    content={role}
  />
    <Header inverted textAlign="center" as="h1" icon>
    <Icon name="user"/>
    {name}
    <Header.Subheader>{email}</Header.Subheader>
    
    </Header>
  </Segment>

  </>;
}

export default AccountHeader;
