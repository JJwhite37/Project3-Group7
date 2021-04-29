import { useState, useEffect } from 'react';

function CurrentMinersRow(props) {
    console.log("Props of CurrentMinersRow")
    console.log(props)
    
    return (
        <tr>
            <td> {props.array[0]} </td>
            <td> {props.array[1]} </td>
        </tr>
    );
}

export default CurrentMinersRow;
