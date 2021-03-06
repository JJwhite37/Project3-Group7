import { useState } from 'react';
import { UserInfo } from './Userinfo';

function CurrentMinersRow(props) {
    const { socket, array, ratio } = props;
    const [isShown, setIsShown] = useState(false);
    
    let money_earned = ratio*array[1];
    money_earned = money_earned.toFixed(2)
    
    console.log("isShown: ", isShown);
    
    return (
        <div
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}>
            
            <tr>
            <div>
                <td> {array[0]} </td>
                <td> {array[1]} </td>
                <td> ${money_earned} </td>
                </div>
            </tr>
            
            {isShown && (
                <UserInfo name={array[0]} socket={socket}/>
                )
            }
        </div>
        
        
    );
}

export default CurrentMinersRow;
