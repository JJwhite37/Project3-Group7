import './App.css';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io(); // Connects to socket connection

function App() {
 
 
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
    
    </div>
  );
}

export default App;