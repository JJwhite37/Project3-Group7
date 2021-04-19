<<<<<<< HEAD
import { useState, useRef, useEffect } from 'react';
=======
>>>>>>> 0c830e14213964478baaf6ff8e1cd9f84a621314
import { useGoogleLogin } from 'react-google-login';
import io from 'socket.io-client';
import { refreshToken } from './refreshToken';

const socket = io(); // Connects to socket connection

<<<<<<< HEAD


function Signin() {
  //will read in the clientID for google login from .env file
  const clientId = process.env.REACT_APP_LOGINID;
  
=======
function Signin() {
  //will read in the clientID for google login from .env file
  const clientId = process.env.REACT_APP_LOGINID;

>>>>>>> 0c830e14213964478baaf6ff8e1cd9f84a621314
  const onSuccess = (userInfo) => {
    console.log('Login Success', userInfo.profileObj);
    console.log(userInfo.profileObj['email']);
    //user's email
    const userEmail = userInfo.profileObj['email'];
    //sets username to default, user stores in DB
<<<<<<< HEAD
    const userName = 'default'
    //url of google profile image
    const userPic = userInfo.profileObj['imageUrl'];
    socket.emit('Login', { userName: userName, userEmail: userEmail, userPic: userPic } );
=======
    const userName = 'default';
    //url of google profile image
    const userPic = userInfo.profileObj['imageUrl'];
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
  
  return (
    <div>
        <div>
            <h1>Sign in with google</h1>
        </div>
        <div>
            <button onClick={signIn} className="button">
                <img src="icons/google.svg" alt="google login" className="icon"></img>
                <span className="buttonText">Sign in with Google</span>
            </button>
        </div>
=======

  return (
    <div>
      <div>
        <h1>Sign in with google</h1>
      </div>
      <div>
        <button onClick={signIn} className="button">
          <img src="icons/google.svg" alt="google login" className="icon"></img>
          <span className="buttonText">Sign in with Google</span>
        </button>
      </div>
>>>>>>> 0c830e14213964478baaf6ff8e1cd9f84a621314
    </div>
  );
}

<<<<<<< HEAD
export default Signin;
=======
export default Signin;
>>>>>>> 0c830e14213964478baaf6ff8e1cd9f84a621314
