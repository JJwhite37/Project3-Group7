import './currentMiners.css';
import { useState, useRef, useEffect } from 'react';
import io from 'socket.io-client';
import Table from './Table';

const socket = io(); // Connects to socket connection

function CurrentMiners(props) {
    const { socket } = props;
    
    const [currentMiners, setCurrentMiners] = useState([]);
    
    console.log("In currentMiners:")
    
    useEffect(() => {
        socket.on('currentMiners', (data) => {
            console.log('currentMiners event received!');
            console.log(data);
            
            setCurrentMiners(data);
        });
    }, []);
    
    console.log("In currentMiners, currentMiners:")
    console.log(currentMiners)

    return (
        <div>
            <currentMinersHeader> Current Miners:</currentMinersHeader>
            <br/>
            <Table currentMiners={currentMiners} />
        </div>
    );
}

export default CurrentMiners;
