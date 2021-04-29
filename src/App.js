import './App.css';
import { Pool } from './Pool.js';
import { Discord } from './Discord.js';
import { useState, useEffect } from 'react';
import io from 'socket.io-client';
//imports the google log in component
import Login from './Login.js';
import Logout from './Logout.js';
import CurrentMiners from './currentMiners';
import Leaderboard from './Leaderboard';

export const socket = io(); // Connects to socket connection
//var clicked = 0; Tabbed out for linting
function App() {
  const [isLogin, setLogin] = useState(false);
  console.log('In App.js:');

  const [myList, changeList] = useState([]);

  function onClickButton() {
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
      //clicked++;
    });
  }, []);

  //recive emit from server after client logs in
  useEffect(() => {
    socket.on('Login', () => {
      console.log('Login success');
      setLogin(true);
    });
  }, []);

  //recive emit from server after client logs out
  useEffect(() => {
    socket.on('Logout', () => {
      console.log('Logout success');
      setLogin(false);
    });
  }, []);

  return (
    <div className = "App">
      {isLogin === true ? (
        //make sure that all dashboard elements go here in the conditional statement not outside
        <table class="dashboard">
          <tr>
            <div class="tophead">
              {' '}
              <Pool list={myList} />{' '}
            </div>
          </tr>
          <tbody>
            <div>
              <tr>
                <td>
                  <div>
                    <Leaderboard socket={socket} />
                    <button class="lookcoolbut" onClick={onClickButton}>
                      test
                    </button>
                  </div>
                </td>
                <td class="currminers">
                  <CurrentMiners socket={socket} />
                </td>
                <td>
                  <Discord />
                </td>
              </tr>
              <tr>
                <Logout socket={socket} />
              </tr>
            </div>
          </tbody>
        </table>
      ) : (
        <div>
          <Login socket={socket} />
        </div>
      )}
    </div>
  );
}

export default App;
