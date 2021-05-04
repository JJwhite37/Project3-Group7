import React from 'react';
import { useState, useEffect } from 'react';

function Pool(props) {
  const { socket } = props;
  const [myList, changeList] = useState([]);
  
  useEffect(() => {
    socket.on('connection', (data) => {
      console.log('connetion event received!!');
      const newList = [...data];
      
      changeList(newList);
      console.log(data);
    });
    
  }, []);
  
  return (
    <div class="pool">
      <div>Current USD$: {myList[7]}</div>
      <div>Balance: {myList[6]}</div>
      <div>Current Effective Hashrate: {myList[0]}</div>
      <div>Average Effective Hashrate: {myList[1]}</div>
      <div>Current Reported Hashrate: {myList[2]}</div>
      <div>Valid Shares: {myList[3]}</div>
      <div>Stale Shares: {myList[4]}</div>
      <div>Invalid Shares: {myList[5]}</div>
    </div>
  );
}

export default Pool;