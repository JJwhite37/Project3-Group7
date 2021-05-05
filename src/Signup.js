import { useRef, useState } from 'react';
import { useGoogleLogin } from 'react-google-login';
//import io from 'socket.io-client';
import { refreshToken } from './refreshToken';
import './Signup.css';
import { socket } from './App.js';

function Signup() {
  const [isUserScreen, setUserScreen] = useState(false);
  const [userName, setUserName] = useState(null);
  //will read in the clientID for google login from .env file
  const clientId = process.env.REACT_APP_LOGINID;

  const inputRef = useRef();

  const onSuccess = (userInfo) => {
    console.log('Login Success', userInfo.profileObj);
    console.log(userInfo.profileObj['email']);
    //user's email
    const userEmail = userInfo.profileObj['email'];
    //url of google profile image
    const userPic = userInfo.profileObj['imageUrl'];
    //tells server if signing in or signing up
    var loginFlag = 0;
    socket.emit('Login', { userName: userName, userEmail: userEmail, userPic: userPic, loginFlag: loginFlag });
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

function registerUser() {
    console.log('register username');
    //username from text input
    const name = inputRef.current.value;
    setUserName(name);
    setUserScreen(true);
  };

  return (
    <div>
      {isUserScreen === true ? (
      <div>
        <div>
          <h1>Use your google account to sign up</h1>
        </div>
        <div>
          <button onClick={signIn} class="but">
            <span className="buttonText">Sign up with Google</span>
          </button>
        </div>
      </div>
      ):(
      <div>
      <h1>Enter a username for your account</h1>
        <input ref={inputRef} type="text" className="txtBox"/>
        <button onClick={registerUser} class="but">
          <span className="buttonText">register username</span>
        </button>
      </div>
      )}
    </div>
  );
}

export default Signup;
