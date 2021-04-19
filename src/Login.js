<<<<<<< HEAD
import { useState, useRef, useEffect } from 'react';
=======
import { useState } from 'react';
>>>>>>> 0c830e14213964478baaf6ff8e1cd9f84a621314
import io from 'socket.io-client';
import Signin from './Signin.js';
import Signup from './Signup.js';

const socket = io(); // Connects to socket connection

<<<<<<< HEAD

=======
>>>>>>> 0c830e14213964478baaf6ff8e1cd9f84a621314
//page that allows user to chose to sign up or sign in
function Login() {
  const [isLog, setLog] = useState(true);
  const [isSign, setSign] = useState(true);
<<<<<<< HEAD
  
  //Signup page
   function onSignup(){
=======

  //Signup page
  function onSignup() {
>>>>>>> 0c830e14213964478baaf6ff8e1cd9f84a621314
    console.log('Signin');
    setLog(false);
    setSign(true);
  }
<<<<<<< HEAD
  
  //signin pagw
  function onSignin(){
=======

  //signin pagw
  function onSignin() {
>>>>>>> 0c830e14213964478baaf6ff8e1cd9f84a621314
    console.log('Signup');
    setLog(false);
    setSign(false);
  }

  return (
    <div>
<<<<<<< HEAD
     {isLog === true ? (
      <div>
        <h1>Welcome</h1>
        <h3>New here? Then sign up, othwise sign in</h3>
          <button onClick={onSignin}>Sign in</button>
          <button onClick={onSignup}>Sign up</button>
      </div>
      ):(
      <div>
      {isSign === true ? (
      <div>
      <Signup socket={socket}/>
      </div>
      ):(
      <div>
      <Signin socket={socket}/>
      </div>
      )}
      </div>
=======
      {isLog === true ? (
        <div>
          <h1>Welcome</h1>
          <h3>New here? Then sign up, othwise sign in</h3>
          <button onClick={onSignin}>Sign in</button>
          <button onClick={onSignup}>Sign up</button>
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
>>>>>>> 0c830e14213964478baaf6ff8e1cd9f84a621314
      )}
    </div>
  );
}

export default Login;
