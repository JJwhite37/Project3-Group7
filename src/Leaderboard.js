import './Leaderboard.css';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import Table from './Table';

const socket = io(); // Connects to socket connection

function Leaderboard(props) {
    const { socket } = props;
    const leaderboard = [['name', 'details'],['name', 'details'],['name', 'details'],['name', 'details'],['name', 'details']]
    console.log("In Leaderboard:")
    
    console.log("In Leaderboard, leaderboard:")
    console.log(leaderboard)

    return (
        <div>
            <p> Leaderboard:</p>
            <Table leaderboard={leaderboard} />
        </div>
    );
}

export default Leaderboard;
