import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Signin from "./pages/signin/signin.component";
import { signout } from "./redux/auth/auth.slice";
import { RootState } from "./redux/root.reducer";

const App = () => {
  const isSignedIn = useSelector((state: RootState) => !!state.auth.user);
  const dispatch = useDispatch();

  if (isSignedIn) {
    return <button onClick={() => dispatch(signout())}>Sign Out</button>;
  } else {
    return <Signin />;
  }
};

export default App;
