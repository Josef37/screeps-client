import React from 'react'
import { Link } from 'react-router-dom'

import { StyledContainer, StyledHeading, StyledNotice } from './signin.styles'
import SigninForm from '../../components/signin/signin.component'

const Signin = () => (
  <StyledContainer>
    <StyledHeading>Sign In</StyledHeading>
    <SigninForm />
    <StyledNotice>
      Not already registered? <Link to='/register'>Register now!</Link>
    </StyledNotice>
  </StyledContainer>
)

export default Signin
