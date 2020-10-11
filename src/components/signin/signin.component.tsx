import * as React from "react";
import { useDispatch } from "react-redux";
import { signin } from "../../redux/auth/auth.slice";
import Auth, { Inputs } from "../auth/auth.component";

const Signin = () => {
  const dispatch = useDispatch();
  const handleSubmit = ({ serverUrl, username, password }: Inputs) => {
    if (!serverUrl || !username) return;
    dispatch(signin({ serverUrl, username, password }));
  };

  return <Auth isRegistration={false} handleSubmit={handleSubmit} />;
};

export default Signin;
