import React from 'react';
import { useState, useEffect } from 'react';
import Row from './Row';

function Leaderboard(props){
    const { socket } = props;
    
    const [leaderboard, setLeaderboard] = useState([['test', 'testName', 17]])
    
    useEffect(() => {
        socket.on('leaderboard', (data) => {
            console.log('Leaderboard event received!');
            console.log(data)
            
            setLeaderboard(data);
        });
    }, []);
    
    console.log(leaderboard)
    return(
        <div>
            <span>
                <div class="leftpad"></div>
                <div class="scrollboard">
                    <table class="scrollboard">
                        <tr>
                            <th> worker_name </th>
                            <th> valid_shares </th>
                        </tr>
                        <tr>
                            {leaderboard.map((item, index) => (
                                <Row name={index} array={item}/>
                            ))}
                        </tr>
                    </table>
                </div>
            </span>
        </div>
    );
}

export default Leaderboard;