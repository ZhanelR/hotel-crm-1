import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {login} from "../store/actionUser"

function Login() {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(login({login:userName, password}))
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={userName} onChange={(event) => setUsername(event.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
      </label>
      <button type="submit">Log In</button>
    </form>
  );
}

export default Login;
