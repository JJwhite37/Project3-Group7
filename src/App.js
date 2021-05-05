import { useState } from 'react';
import io from 'socket.io-client';

import DashboardAndLogin from './DashboardAndLogin';
import LandingPage from './LandingPage';

export const socket = io(); 

function App() {
  const [onLanding, setLanding] = useState(true);
  
  function onClickButton() {
    console.log('Next Page Button is clicked');
    setLanding(false);
  }
  
  console.log(onLanding);
  
  if (onLanding === true){
    return (
      <div>
        <LandingPage />
        <button onClick={onClickButton}> Proceed to Login </button>
      </div>
    );
  }
  else if (onLanding === false){
    return (
      <div>
        <DashboardAndLogin socket={ socket } />
      </div>
    );
  }
}

export default App;