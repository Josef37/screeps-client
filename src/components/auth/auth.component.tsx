import * as React from "react";
import { useState } from "react";
import {
  StyledForm,
  StyledLabel,
  StyledInput,
  StyledButton,
} from "./auth.styles";

export interface Inputs {
  serverUrl: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthProps {
  isRegistration: boolean;
  handleSubmit: (inputs: Inputs) => void;
}

const Auth: React.FC<AuthProps> = ({ isRegistration, handleSubmit }) => {
  const [inputs, setInputs] = useState({
    serverUrl: "http://localhost:21025",
    username: "josef",
    email: "josef@mail.com",
    password: "1234",
    confirmPassword: "1234",
  });
  const { serverUrl, username, email, password, confirmPassword } = inputs;

  const handleChange = (name: string, value: string) => {
    setInputs({ ...inputs, [name]: value });
  };

  return (
    <StyledForm
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit({
          serverUrl: serverUrl.trim(),
          username: username.trim(),
          email: email.trim(),
          password,
          confirmPassword,
        });
      }}
    >
      <StyledLabel>
        Server URL
        <StyledInput
          type="url"
          value={serverUrl}
          onChange={(e) => handleChange("serverUrl", e.target.value)}
        />
      </StyledLabel>

      <StyledLabel>
        Username
        <StyledInput
          type="text"
          value={username}
          onChange={(e) => handleChange("username", e.target.value)}
        />
      </StyledLabel>

      {isRegistration ? (
        <StyledLabel>
          E-Mail (optional)
          <StyledInput
            type="email"
            value={email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </StyledLabel>
      ) : null}

      <StyledLabel>
        Password (can be empty)
        <StyledInput
          type="password"
          value={password}
          onChange={(e) => handleChange("password", e.target.value)}
        />
      </StyledLabel>

      {isRegistration ? (
        <StyledLabel>
          Repeat Password to Confirm
          <StyledInput
            type="password"
            value={confirmPassword}
            onChange={(e) => handleChange("confirmPassword", e.target.value)}
          />
        </StyledLabel>
      ) : null}

      <StyledButton type="submit">
        {isRegistration ? "Register" : "Sign In"}
      </StyledButton>
    </StyledForm>
  );
};

export default Auth;
