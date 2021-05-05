import './DashboardAndLogin.css';
import { useState, useEffect } from 'react';

import Pool from './Pool.js';
import Discord from './Discord.js';
import Login from './Login.js';
import Logout from './Logout.js';
import CurrentMiners from './currentMiners';
import Leaderboard from './Leaderboard';
import logo from './econminer.png';

function DashboardAndLogin(props) {
  const { socket } = props;
  
  console.log('In DashboardAndLogin.js:');
  
  const [isLogin, setLogin] = useState(false);
  const [ratio, setRatio] = useState(.06);
  
  function onClickButton() {
    console.log('Button is clicked');
    socket.emit('testing');
  }

  function onRatioButton() {
    console.log('Ratio Button is clicked');
    socket.emit('ratio');
  }

  useEffect(() => {
    socket.on('Login', () => {
      console.log('Login event received!!');
      setLogin(true);
    });
    
    socket.on('Logout', () => {
      console.log('Logout event received!!');
      setLogin(false);
    });
    
    socket.on('ratio', (data) => {
      console.log('ratio event received!!');
      console.log(data);
      
      setRatio(data);
    });
    
    socket.on('testing', () => {
      console.log('testing event received!!');
    });
  }, []);
  
  console.log("Ratio:", ratio);
  
  if (isLogin === true){
    return (
      <div className = "background">
        <div className = "DashboardAndLogin">
          <table class="dashboard">
            
            <tr>
              <img src={logo} width="800em" height="160em"/>
              <div class="tophead">
                <button class="lookcoolbut" onClick={onClickButton}></button>
                {' '}
                <Pool socket={ socket } />{' '}
              </div>
            </tr>
            
            <tbody>
              <div>
                <tr>
                  
                  <td class="square">
                    <div class="currentl">
                      <Leaderboard socket={socket} ratio={ratio} />
                    </div>
                  </td>
                  
                  <td class="square">
                    <div class="currentm">
                      <CurrentMiners socket={socket} ratio={ratio}/>
                    </div>
                    <button class="lookcoolbut" onClick={onRatioButton}>Update Ratio</button>
                  </td>
                  
                  <td class="square">
                    <Discord />
                  </td>
                  
                </tr>
                
                <Logout class= "buttonstyle" socket={socket} />
              </div>
            </tbody>
            
          </table>
        </div>
      </div>
      );
  }
  else if (isLogin === false){
    return(
      <div className = "background">
        <div className = "DashboardAndLogin">
          <div class="logmain">
            <div class="login">
                <Login socket={socket} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DashboardAndLogin;
