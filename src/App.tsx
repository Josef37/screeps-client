import React from "react";
import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";

import SigninPage from "./pages/signin/signin.component";
import RegisterPage from "./pages/register/register.component";
import { RootState } from "./redux/root.reducer";

const App = () => {
  const isSignedIn = useSelector((state: RootState) => !!state.auth.user);

  return (
    <Switch>
      <Route path="/signin" exact>
        {isSignedIn ? <Redirect to="/" /> : <SigninPage />}
      </Route>
      <Route path="/register" exact>
        {isSignedIn ? <Redirect to="/" /> : <RegisterPage />}
      </Route>
      <Route path="/">
        <Redirect to="/signin" />
      </Route>
    </Switch>
  );
};

export default App;
