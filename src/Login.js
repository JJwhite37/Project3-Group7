import { useState, useEffect } from 'react';
//import io from 'socket.io-client';
import { useGoogleLogout } from 'react-google-login';
import Signin from './Signin.js';
import Signup from './Signup.js';
import './Login.css';
import { socket } from './App.js';
import logo from './econminer.png';

//page that allows user to chose to sign up or sign in
function Login() {
  const [isLog, setLog] = useState(true);
  const [isSign, setSign] = useState(true);

  const clientId = process.env.REACT_APP_LOGINID;
  const onLogoutSuccess = (userInfo) => {
    console.log('Logged out');
    socket.emit('Logout');
  };

  const onFailure = () => {
    console.log('Failure');
  };
  
  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });
  
  useEffect(() => {
    socket.on('LoginFail', (data) => {
      console.log('data');
      setLog(true);
      {signOut()}
    });
  }, []);

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
          <img src={logo} width="400em" height="90em"/>
          <h3>New here? Then sign up, othwise sign in</h3>
          <div className="buttondiv">
            <button onClick={onSignin} className="but">Sign in</button>
            <button onClick={onSignup} className="but">Sign up</button>
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
