import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from '../Shared/Modal.jsx';

export default function Login() {
  const [signUpUsername, setSignUpUsername] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showModal, setShowModal] = useState(false);

  const signUp = () => {
    axios({
      method: 'POST',
      data: {
        username: signUpUsername,
        password: signUpPassword,
      },
      withCredentials: true,
      url: 'http://localhost:3000/signup',
    })
      .then((res) => console.log(res));
  };
  const login = () => {
    axios({
      method: 'POST',
      data: {
        username: signUpUsername,
        password: signUpPassword,
      },
      withCredentials: true,
      url: 'http://localhost:3000/login',
    })
      .then((res) => console.log(res));
  };
  const getUser = () => {
    axios({
      method: 'GET',
      withCredentials: true,
      url: 'http://localhost:3000/user',
    })
      .then((res) => console.log(res));
  };

  return (
    <div className="flex flex-col h-full justify-evenly items-center">
      {/*<form className="border-2 border-black flex flex-col justify-between">
        <h3>SignUp</h3>
        <label for="username">Username:</label>
        <input autofocus className="border border-yellow-600 rounded" type="text" onChange={(e) => setSignUpUsername(e.target.value)} name="username"/>
        <label>Password:</label>
        <input className="border border-yellow-600 rounded" type="text" onChange={(e) => setSignUpPassword(e.target.value)} />
      </form>*/}

      <form className="flex flex-col w-3/4 h-1/4 justify-evenly">
        <label>Username:</label>
        <input className="border-2 border-yellow-600 rounded" type="text" onChange={(e) => setLoginUsername(e.target.value)} />
        <label>Password:</label>
        <input className="border-2 border-yellow-600 rounded" type="text" onChange={(e) => setLoginPassword(e.target.value)} />
      </form>

        <button className=" h-10 bg-yellow-600 rounded w-3/4" onClick={getUser}>Submit</button>

    </div>
  );
}
