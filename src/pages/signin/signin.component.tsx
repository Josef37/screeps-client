import React from "react";
import { SigninContainer, StyledHeading } from "./signin.styles";
import SigninForm from "../../components/signin/signin.component";

const Signin = () => (
  <SigninContainer>
    <StyledHeading>Sign In</StyledHeading>
    <SigninForm />
  </SigninContainer>
);

export default Signin;
