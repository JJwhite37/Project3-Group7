import './currentMiners.css';
import { useState, useEffect } from 'react';
import CurrentMinersRow from './CurrentMinersRow';

function CurrentMiners(props) {
    console.log('In currentMiners:');
  
    const { socket, ratio } = props;
    const [currentMiners, setCurrentMiners] = useState([]);

    useEffect(() => {
        socket.on('currentMiners', (data) => {
            console.log('currentMiners event received!');
            console.log(data);

            setCurrentMiners(data);
        });
    }, []);
  
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
                            <th> money_earned </th>
                        </tr>
                        
                        <tr>
                            {currentMiners.map((item, index) => (
                                <CurrentMinersRow name={index} array={item} socket= {socket} ratio={ratio}/>
                            ))}
                        </tr>
                    </table>
                </div>
            </span>
        </div>
    );
  
  
}

export default CurrentMiners;
