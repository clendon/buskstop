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
    <div className={`flex flex-col h-full justify-evenly items-center ${showModal ? 'backdrop-filter backdrop-brightness-75' : ''}`}>
      {showModal && 
        (
          <Modal onClick={(e) => {setShowModal(false)}}> 
            <form className="flex flex-col justify-evenly w-3/4">
              <label for="username">Username:</label>
              <input className="border-2 border-yellow-600 rounded" type="text" onChange={(e) => setSignUpUsername(e.target.value)} name="username"/>
              <label>Password:</label>
              <input className="border-2 border-yellow-600 rounded" type="text" onChange={(e) => setSignUpPassword(e.target.value)} />
            </form>
            <button type="submit" className=" h-10 bg-yellow-600 rounded w-3/4" onClick={signUp}>Register</button>
          </Modal>
        )
      }
      <form className="flex flex-col w-3/4 h-1/4 justify-evenly">
        <label>Username:</label>
        <input className="border-2 border-yellow-600 rounded" type="text" onChange={(e) => setLoginUsername(e.target.value)} />
        <label>Password:</label>
        <input className="border-2 border-yellow-600 rounded" type="text" onChange={(e) => setLoginPassword(e.target.value)} />
      </form>
      <div className="flex flex-col items-center justify-around h-1/6">
        <button type="submit" className=" h-10 bg-yellow-600 rounded w-3/4" onClick={getUser}>Submit</button>
        <button className="underline text-xs" onClick={() => {setShowModal(true)}}>Not signed up yet? Click here to register.</button>
      </div>
    </div>
  );
}
