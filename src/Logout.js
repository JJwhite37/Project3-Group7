import React from 'react';
import { useGoogleLogout } from 'react-google-login';
import io from 'socket.io-client';

const socket = io(); // Connects to socket connection

function Logout() {
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

  return (
    <button onClick={signOut} className="button">
      <img src="icons/google.svg" alt="google login" className="icon"></img>
      <span className="buttonText">Sign out</span>
    </button>
  );
}

export default Logout;