import './currentMiners.css';
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
}

export default CurrentMiners;
