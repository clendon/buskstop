import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function Login() {
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [loginUsername, setloginUsername] = useState('');
  const [loginPassword, setloginPassword] = useState('');
  const signUp = () => {
    axios({
      method: 'POST',
      data: {
        username: signUpUsername,
        password: signUpPassword,
      },
      withCredentials: true,
      url: 'http://localhost:3000/signup'
    })
    .then(res => console.log(res))
  }
  const login = () => {
    axios({
      method: 'POST',
      data: {
        username: signUpUsername,
        password: signUpPassword,
      },
      withCredentials: true,
      url: 'http://localhost:3000/login'
    })
    .then(res => console.log(res))
  }
  const getUser = () => {
    axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:3000/user'
    })
    .then(res => console.log(res))
  }

  return (
    <>
      <form >
        <h3>SignUp</h3>
        <label>Username:</label>
        <input type="text" onChange={e => setSignUpUsername(e.target.value)}/>
        <label>Password:</label>
        <input type="text" onChange={e => setSignUpPassword(e.target.value)}/>
        <button onClick={signUp}>Submit</button>
      </form>

      <form >
        <h3>Login</h3>
        <label>Username:</label>
        <input type="text" onChange={e => setLoginUsername(e.target.value)}/>
        <label>Password:</label>
        <input type="text" onChange={e => setLoginPassword(e.target.value)}/>
        <button onClick={login}>Submit</button>
      </form>


      <form >
        <h3>Get User</h3>
        <button onClick={getUser}>Submit</button>
      </form>
    </>
  )
}