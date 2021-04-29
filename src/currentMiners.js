import './currentMiners.css';
import { useState, useEffect } from 'react';
import CurrentMinersRow from './CurrentMinersRow';

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
  
  return(
        <div>
            Current Miners
            <span>
                <div class="leftpad"></div>
                <div class="scrollboard">
                    <table class="scrollboard">
                        <tr>
                            <th> worker_name </th>
                            <th> valid_shares </th>
                        </tr>
                        <tr>
                            {currentMiners.map((item, index) => (
                                <CurrentMinersRow name={index} array={item}/>
                            ))}
                        </tr>
                    </table>
                </div>
            </span>
        </div>
    );
  
  
}

export default CurrentMiners;
