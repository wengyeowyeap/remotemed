import React from 'react';
import LoginForm from '../components/LoginForm'
import { Col, Row} from 'reactstrap';




const HomeSignInPage = (props) => {
  const {token, setToken} = props
  document.title="HomePage"

  return (
  
  <>
    <Row className='justify-content-center'>
    <Col md="6" className='mt-5 bg-light'>
      <LoginForm token={token} setToken={setToken}></LoginForm>
    </Col>
    </Row>
  </>)

}

export default HomeSignInPage;