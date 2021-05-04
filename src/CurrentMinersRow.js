import { useState, useEffect } from 'react';
import { UserInfo } from './Userinfo';

function CurrentMinersRow(props) {
    const [isShown, setIsShown] = useState(false);

    console.log(isShown)
    
    return (
        <div
            onMouseEnter={() => setIsShown(true)}
            onMouseLeave={() => setIsShown(false)}>
            
            <tr>
                <td> {props.array[0]} </td>
                <td> {props.array[1]} </td>
            </tr>
            
            {isShown && (
                
                <UserInfo name={props.array[0]} />
                
                )}
        </div>
        
        
    );
}

export default CurrentMinersRow;
