import React from 'react';
import { useDispatch } from 'react-redux';
import { signin, signout } from './redux/user/user.slice';

function App() {
  const dispatch = useDispatch()

  return (
    <>
      <button onClick={() => dispatch(signin({ name: 'John Doe', password: '1234' }))}>Sign In</button>
      <button onClick={() => dispatch(signout())}>Sign Out</button>
    </>
  );
}

export default App;
