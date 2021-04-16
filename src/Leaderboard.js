import './Leaderboard.css';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import Table from './Table';

const socket = io(); // Connects to socket connection

function Leaderboard(props) {
    const { socket } = props;
    
    const [leaderboard, setLeaderboard] = useState([]);
    
    console.log("In Leaderboard:")
    
    useEffect(() => {
        socket.on('leaderboard', (data) => {
            console.log('leaderboard event received!');
            console.log(data);
            
            setLeaderboard(data);
        });
    }, []);
    
    console.log("In Leaderboard, leaderboard:")
    console.log(leaderboard)

    return (
        <div>
            <leaderboardHeader> Leaderboard:</leaderboardHeader>
            <br/>
            <Table leaderboard={leaderboard} />
        </div>
    );
}

export default Leaderboard;