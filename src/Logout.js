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

<<<<<<< HEAD
 const { signOut } = useGoogleLogout({
=======
  const { signOut } = useGoogleLogout({
>>>>>>> 0c830e14213964478baaf6ff8e1cd9f84a621314
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

<<<<<<< HEAD
export default Logout;
=======
export default Logout;
>>>>>>> 0c830e14213964478baaf6ff8e1cd9f84a621314
