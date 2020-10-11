import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signin } from "../../redux/auth/auth.slice";
import {
  StyledForm,
  StyledLabel,
  StyledInput,
  StyledButton,
} from "./signin.styles";

const Signin = () => {
  const [serverUrl, setServerUrl] = useState("http://localhost:21025");
  const [username, setUsername] = useState("josef");
  const [password, setPassword] = useState("1234");

  const dispatch = useDispatch();

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!serverUrl || !username) return;
    dispatch(signin({ serverUrl, username, password }));
  };

  return (
    <StyledForm onSubmit={onSubmit}>
      <StyledLabel>
        Server URL
        <StyledInput
          type="url"
          value={serverUrl}
          onChange={(e) => setServerUrl(e.target.value)}
        />
      </StyledLabel>
      <StyledLabel>
        Username
        <StyledInput
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </StyledLabel>
      <StyledLabel>
        Password
        <StyledInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </StyledLabel>
      <StyledButton type="submit">Sign In</StyledButton>
    </StyledForm>
  );
};

export default Signin;
