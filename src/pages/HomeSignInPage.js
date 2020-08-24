import React from 'react';
import LoginForm from '../components/LoginForm'
import { Container } from 'reactstrap';




const HomeSignInPage = () => {
  document.title="HomePage"

  return <>


    <Container className='mt-5'>

      <LoginForm></LoginForm>

    </Container>


  </>




}

export default HomeSignInPage;