import './App.css';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import Leaderboard from './Leaderboard';

const socket = io(); // Connects to socket connection

function App() {
 console.log("In App.js:")
 
 function onClickButton(){
        console.log('Button is clicked');
        socket.emit('testing');
    }
 
  useEffect(() => {
    socket.on('testing', () => {
      console.log('testing event working');
      
  
    });
  }, []);

  return (
    <div>
    <button onClick={onClickButton}>test</button>
    <Leaderboard socket={socket}  />
    </div>
  );
}

export default App;