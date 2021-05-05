import { useState, useEffect } from 'react';

function Row(props) {
    console.log("Props of Row")
    console.log(props)
    
    return (
        <tr class="right">
            <td> {props.array[1]} </td>
            <td class="rightr"> {props.array[2]} </td>
        </tr>
    );
}

export default Row;
