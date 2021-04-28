import { useState } from 'react';
//import io from 'socket.io-client';
import Signin from './Signin.js';
import Signup from './Signup.js';
import './Login.css';
import { socket } from './App.js';

//page that allows user to chose to sign up or sign in
function Login() {
  const [isLog, setLog] = useState(true);
  const [isSign, setSign] = useState(true);

  //Signup page
  function onSignup() {
    console.log('Signin');
    setLog(false);
    setSign(true);
  }

  //signin pagw
  function onSignin() {
    console.log('Signup');
    setLog(false);
    setSign(false);
  }

  return (
    <div>
      {isLog === true ? (
        <div>
          <h1>Welcome</h1>
          <h3>New here? Then sign up, othwise sign in</h3>
          <div className="buttondiv">
            <button onClick={onSignin} className="button">Sign in</button>
            <button onClick={onSignup} className="button">Sign up</button>
          </div>
        </div>
      ) : (
        <div>
          {isSign === true ? (
            <div>
              <Signup socket={socket} />
            </div>
          ) : (
            <div>
              <Signin socket={socket} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Login;
