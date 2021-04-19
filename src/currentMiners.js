import './currentMiners.css';
<<<<<<< HEAD
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
=======
import { useState, useEffect } from 'react';
import Table from './Table';

function CurrentMiners(props) {
  const { socket } = props;

  const [currentMiners, setCurrentMiners] = useState([]);

  console.log('In currentMiners:');

  useEffect(() => {
    socket.on('currentMiners', (data) => {
      console.log('currentMiners event received!');
      console.log(data);

      setCurrentMiners(data);
    });
  });

  console.log('In currentMiners, currentMiners:');
  console.log(currentMiners);

  return (
    <div>
      <currentMinersHeader> Current Miners:</currentMinersHeader>
      <br />
      <Table currentMiners={currentMiners} />
    </div>
  );
>>>>>>> 0c830e14213964478baaf6ff8e1cd9f84a621314
}

export default CurrentMiners;
