
function Row(props) {
    const { socket, array, ratio } = props;
    
    console.log("Props of Row");
    console.log(props);
    
    let money_earned = ratio*array[2];
    money_earned = money_earned.toFixed(2)
    
    return (
        <tr>
            <td> {array[1]} </td>
            <td> {array[2]} </td>
            <td class="rightr">  ${money_earned} </td>
        </tr>
    );
}

export default Row;
