import { useState, useRef, useEffect } from 'react';
import { useGoogleLogin } from 'react-google-login';
import io from 'socket.io-client';
import { refreshToken } from './refreshToken';

const socket = io(); // Connects to socket connection



function Login() {
  //will read in the clientID for google login from .env file
  const clientId = process.env.REACT_APP_LOGINID;
  
  const inputRef = useRef();
  
  const onSuccess = (userInfo) => {
    console.log('Login Success', userInfo.profileObj);
    console.log(userInfo.profileObj['email']);
    //user's email
    const userEmail = userInfo.profileObj['email'];
    //username from text input
    const userName = inputRef.current.value;
    //url of google profile image
    const userPic = userInfo.profileObj['imageUrl'];
    socket.emit('Login', { userName: userName, userEmail: userEmail, userPic: userPic } );
    refreshToken(userInfo);
  };

  const onFailure = (failInfo) => {
    console.log('Login fail', failInfo);
  };

 const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
  });

  return (
    <div>
      <div>
        <h1>Type in your miner username</h1>
        <input ref={inputRef} type="text" />
      </div>
      <div>
        <button onClick={signIn} className="button">
          <img src="icons/google.svg" alt="google login" className="icon"></img>
          <span className="buttonText">Sign in with Google(not functioning)</span>
        </button>
      </div>
    </div>
  );
}

export default Login;
