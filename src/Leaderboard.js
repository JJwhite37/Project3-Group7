import React from 'react';
import { useState, useEffect } from 'react';
import Row from './Row';

function Leaderboard(props){
    console.log("In Leaderboard:");
    
    const { socket, ratio } = props;
    const [leaderboard, setLeaderboard] = useState([['','Loading...',0]]);
    
    useEffect(() => {
        socket.on('leaderboard', (data) => {
            console.log('Leaderboard event received!');
            console.log(data);
            
            setLeaderboard(data);
        });
    }, []);
    
    return(
        <div>
            Leaderboard
            <span>
                <div class="leftpad"></div>
                <div class="scrollboard">
                    <table class="scrollboard">
                        <tr>
                            <th> worker_name </th>
                            <th> valid_shares </th>
                            <th> money_earned </th>
                        </tr>
                        
                        <tr>
                            {leaderboard.map((item, index) => (
                                <Row name={index} array={item} socket={socket} ratio={ratio}/>
                            ))}
                        </tr>
                    </table>
                </div>
            </span>
        </div>
    );
}

export default Leaderboard;