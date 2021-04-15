import './App.css';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
//imports the google log in component
import Login from './Login.js';

const socket = io(); // Connects to socket connection

function App() {
  const [isLogin, setLogin] = useState(false);
 
 
 function onClickButton(){
        console.log('Button is clicked');
        socket.emit('testing');
    }
 
  useEffect(() => {
    socket.on('testing', () => {
      console.log('testing event working');
      
  
    });
  }, []);
  
  //recive emit from server after client logs in
  useEffect(() => {
    socket.on('Login', () => {
      console.log('Login success');
      setLogin(true);
    });
  }, []);

  return (
    <div>
     {isLogin === true ? (
      <button onClick={onClickButton}>test</button>
      ) : (
      <div>
        <h1>Welcome stranger</h1>
        <Login />
      </div>
      )}
    </div>
  );
}

export default App;