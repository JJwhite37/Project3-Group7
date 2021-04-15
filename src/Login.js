import { useState, useRef, useEffect } from 'react';
import { useGoogleLogin } from 'react-google-login';
import io from 'socket.io-client';

const socket = io(); // Connects to socket connection


function Login() {
  //will read in the clientID for google login from .env file
  const clientID = process.env.REACT_APP_LOGINID;
  
  const inputRef = useRef();
  
  const Success = (res) => {
    console.log('Login Success', res.profileObj);
    socket.emit('login')
  };

  const Failure = (res) => {
    console.log('Login fail', res);
  };

  const { signIn } = useGoogleLogin({
    Success,
    Failure,
    clientID,
    isSignedIn: true,
    accessType: 'offline',
  });
  
   //use for testing by bypassing google login
  function bypassLogin(){
        console.log('bypass login');
        const userName = inputRef.current.value;
        socket.emit('Login', { userName });
  }

  return (
    <div>
      <div>
        <input ref={inputRef} type="text" />
        <div>
          <button onClick={bypassLogin}>enter your username(temp login)</button>
        </div>
      </div>
      <div>
        <button onClick={signIn} className="button">
          <span className="buttonText">Sign in with Google(not functioning)</span>
        </button>
      </div>
    </div>
  );
}

export default Login;
