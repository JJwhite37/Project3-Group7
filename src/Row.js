function Row(props) {
    const { socket, array, ratio } = props;
    
    console.log("Props of Row");
    console.log(props);
    
    const money_earned = ratio*array[2];

    
    return (
        <tr>
            <td> {array[1]} </td>
            <td> {array[2]} </td>
            <td> ${money_earned} </td>
        </tr>
    );
}

export default Row;
