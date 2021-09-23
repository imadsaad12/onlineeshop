import {Container,Pagination} from 'semantic-ui-react'
import {useRouter} from 'next/router'
function ProductPagination({totalPages}) {
  return (
    <Container textAlign="center" style={{margin:"2em"}}> 
      <Pagination 
      defaultActivePage={1}
      totalPages={totalPages}
      onPageChange={(e,data)=>{
          data.activePage===1 
          ?router.push('/')
          :router.push(`/?page=${data.active}`)
      }}
      />
    </Container>
  )
}

export default ProductPagination;
