<<<<<<< HEAD
import { useState, useRef, useEffect } from 'react';
=======
import { useRef } from 'react';
>>>>>>> 0c830e14213964478baaf6ff8e1cd9f84a621314
import { useGoogleLogin } from 'react-google-login';
import io from 'socket.io-client';
import { refreshToken } from './refreshToken';

const socket = io(); // Connects to socket connection

<<<<<<< HEAD


function Signup() {
  //will read in the clientID for google login from .env file
  const clientId = process.env.REACT_APP_LOGINID;
  
  const inputRef = useRef();
  
=======
function Signup() {
  //will read in the clientID for google login from .env file
  const clientId = process.env.REACT_APP_LOGINID;

  const inputRef = useRef();

>>>>>>> 0c830e14213964478baaf6ff8e1cd9f84a621314
  const onSuccess = (userInfo) => {
    console.log('Login Success', userInfo.profileObj);
    console.log(userInfo.profileObj['email']);
    //user's email
    const userEmail = userInfo.profileObj['email'];
    //username from text input
    const userName = inputRef.current.value;
    //url of google profile image
    const userPic = userInfo.profileObj['imageUrl'];
<<<<<<< HEAD
    socket.emit('Login', { userName: userName, userEmail: userEmail, userPic: userPic } );
=======
    socket.emit('Login', { userName: userName, userEmail: userEmail, userPic: userPic });
>>>>>>> 0c830e14213964478baaf6ff8e1cd9f84a621314
    refreshToken(userInfo);
  };

  const onFailure = (failInfo) => {
    console.log('Login fail', failInfo);
  };

<<<<<<< HEAD
 const { signIn } = useGoogleLogin({
=======
  const { signIn } = useGoogleLogin({
>>>>>>> 0c830e14213964478baaf6ff8e1cd9f84a621314
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
  });
<<<<<<< HEAD
  
  //for testing purposes
   function bypassLogin(){
=======

  //for testing purposes
  function bypassLogin() {
>>>>>>> 0c830e14213964478baaf6ff8e1cd9f84a621314
    console.log('bypass login');
    const userName = inputRef.current.value;
    //user's email
    const userEmail = 'steve@mail.com';
    //url of google profile image
<<<<<<< HEAD
    const userPic = "dawddwad";
    socket.emit('Login', { userName: userName, userEmail: userEmail, userPic: userPic } );
=======
    const userPic = 'dawddwad';
    socket.emit('Login', { userName: userName, userEmail: userEmail, userPic: userPic });
>>>>>>> 0c830e14213964478baaf6ff8e1cd9f84a621314
  }

  return (
    <div>
      <div>
        <h1>Type in your miner username</h1>
        <input ref={inputRef} type="text" />
      </div>
      <div>
<<<<<<< HEAD
          <button onClick={bypassLogin} className="button">
          <span className="buttonText">enter your username(for testing dashboard)</span>
          </button>
        </div>
=======
        <button onClick={bypassLogin}>enter your username(for testing dashboard)</button>
      </div>
>>>>>>> 0c830e14213964478baaf6ff8e1cd9f84a621314
      <div>
        <button onClick={signIn} className="button">
          <img src="icons/google.svg" alt="google login" className="icon"></img>
          <span className="buttonText">Sign in with Google</span>
        </button>
      </div>
    </div>
  );
}

<<<<<<< HEAD
export default Signup;
=======
export default Signup;
>>>>>>> 0c830e14213964478baaf6ff8e1cd9f84a621314
