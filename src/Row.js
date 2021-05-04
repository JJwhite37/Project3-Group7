function Row(props) {
    console.log("Props of Row");
    console.log(props);
    
    return (
        <tr>
            <td> {props.array[1]} </td>
            <td> {props.array[2]} </td>
        </tr>
    );
}

export default Row;
