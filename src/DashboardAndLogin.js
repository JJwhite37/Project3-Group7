import './DashboardAndLogin.css';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';

import Pool from './Pool.js';
import Discord from './Discord.js';
import Login from './Login.js';
import Logout from './Logout.js';
import CurrentMiners from './currentMiners';
import Leaderboard from './Leaderboard';

export const socket = io(); // Connects to socket connection
//var clicked = 0; Tabbed out for linting
function DashboardAndLogin() {
  const [isLogin, setLogin] = useState(false);
  console.log('In DashboardAndLogin.js:');

  const [myList, changeList] = useState([]);

  function onClickButton() {
    console.log('Button is clicked');
    socket.emit('testing');
  }

  useEffect(() => {
    socket.on('testing', () => {
      console.log('testing event working');
    });
    
    socket.on('connection', (data) => {
      console.log('testing event working');
      const newList = [...data];
      changeList(newList);
      console.log(data);
    });
    
    socket.on('Login', () => {
      console.log('Login success');
      setLogin(true);
    });
    
    socket.on('Logout', () => {
      console.log('Logout success');
      setLogin(false);
    });
    
  }, []);
  
  if (isLogin === true){
    return (
      <div className = "DashboardAndLogin">
        <table class="dashboard">
          
          <tr>
            <h1 style={{color: "#23212c", fontsize: "1px", fontweight: "bold", textalign: "center", }}>Econ Miner</h1>
            <div class="tophead">
              {' '}
              <Pool list={myList} />{' '}
            </div>
          </tr>
          
          <tbody>
            <div>
              <tr>
                
                <td class="square">
                  <Leaderboard socket={socket} />
                  <button class="lookcoolbut" onClick={onClickButton}>test</button>
                </td>
                
                <td class="square">
                  <CurrentMiners socket={socket} />
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
      );
  }
  else if (isLogin === false){
    return(
      <div className = "DashboardAndLogin">
        <div class="login">
            <Login socket={socket} />
        </div>
      </div>
    );
  }
}

export default DashboardAndLogin;
