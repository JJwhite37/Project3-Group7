import React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

export function UserInfo(props) {
  const { socket } = props;
  
  const [myList, changeList] = useState([]);
  const [isShown, setIsShown] = useState(false);
  
  socket.emit('UserInfo', {name: props.name});
  
  useEffect(() => {
    socket.on('UserInfo', (data) => {
      console.log('UserInfo returned ');
      console.log(data);
      
      changeList(data);
    });
  });
  
  return (
    <div class="info">
      <div>Current Effective Hashrate: {myList[0]}</div>
      <div>Average Effective Hashrate: {myList[1]}</div>
      <div>Current Reported Hashrate: {myList[2]}</div>
      <div>Valid Shares: {myList[3]}</div>
      <div>Stale Shares: {myList[4]}</div>
      <div>Invalid Shares: {myList[5]}</div>
    </div>
  );
}

export default UserInfo;