import React from 'react';
import { useGoogleLogout } from 'react-google-login';

function Logout(props) {
  const { socket } = props;
  
  const clientId = process.env.REACT_APP_LOGINID;
  
  const onLogoutSuccess = (userInfo) => {
    socket.emit('Logout');
    console.log('Logged out');
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
    <button onClick={signOut} className="logOutButton">
      <span className="buttonText">Sign out</span>
    </button>
  );
}

export default Logout;
