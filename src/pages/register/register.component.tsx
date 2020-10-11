import React from 'react'
import { Link } from 'react-router-dom'

import {
  StyledContainer,
  StyledHeading,
  StyledNotice
} from '../signin/signin.styles'
import RegisterForm from '../../components/register/register.component'

const RegisterPage = () => (
  <StyledContainer>
    <StyledHeading>Register</StyledHeading>
    <RegisterForm />
    <StyledNotice>
      Already have an account? <Link to='/signin'>Sign in here.</Link>
    </StyledNotice>
  </StyledContainer>
)

export default RegisterPage
