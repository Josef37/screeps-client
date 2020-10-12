import React from 'react'
import { useSelector } from 'react-redux'
import { Switch, Route, Redirect, Link } from 'react-router-dom'

import SigninPage from './pages/signin/signin.component'
import RegisterPage from './pages/register/register.component'
import { RootState } from './redux/root.reducer'

const App = () => {
  const isSignedIn = useSelector((state: RootState) => !!state.auth.user)

  return (
    <Switch>
      <Route path='/signin' exact>
        {isSignedIn ? <Redirect to='/' /> : <SigninPage />}
      </Route>
      <Route path='/register' exact>
        {isSignedIn ? <Redirect to='/' /> : <RegisterPage />}
      </Route>
      <Route path='/'>
        { isSignedIn
          ? <h1>This is Screeps!</h1>
          : <Link to="/signin" style={{ fontSize: '10em' }}>Sign in</Link> }
      </Route>
    </Switch>
  )
}

export default App
