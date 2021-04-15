import React from 'react';
import { useGoogleLogout } from 'react-google-login';

function Logout() {
  const clientID = process.env.REACT_APP_LOGINID;
  const Success = (res) => {
    console.log('Logged out');
  };

  const Failure = () => {
    console.log('Failure');
  };

  const { signOut } = useGoogleLogout({
    clientID,
    Success,
    Failure,
  });

  return (
    <button onClick={signOut} className="button">
      <span className="buttonText">Sign out</span>
    </button>
  );
}

export default Logout;