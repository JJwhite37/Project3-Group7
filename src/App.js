import './App.css';
import { Pool } from './Pool.js';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import Leaderboard from './Leaderboard';

const socket = io(); // Connects to socket connection
var clicked = 0;
function App() {
 console.log("In App.js:")
 
 const[myList, changeList] = useState([]);
 
 function onClickButton(){
        console.log('Button is clicked');
        socket.emit('testing');
    }
 
  useEffect(() => {
    socket.on('testing', () => {
      console.log('testing event working');

    });
  }, []);
  
  useEffect(() => {
    socket.on('connection', (data) => {
      console.log('testing event working');
      const newList = [...data];
      changeList(newList);
      console.log(data);
      clicked++;
    });
  }, []);

  return (
    <div>
      <button onClick={onClickButton}>test</button>
      
      <Leaderboard socket={socket}  />
      
      <div> <Pool list={myList} /> </div>
    </div>
  );
}

export default App;