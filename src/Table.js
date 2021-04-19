import React from 'react';
import PropTypes from 'prop-types';
import './Table.css';

function Table(props) {
  const { currentMiners } = props;
  
  const result = [];
  let i;
  for (i = 0; i < currentMiners.length; i += 1) {
    result.push(
        <tr>
          <td>{currentMiners[i][0]}</td>
          <td>{currentMiners[i][1]}</td>
          <br />
        </tr>,
        <br />
      );
  }


  return <tableBody>{result}</tableBody>;
}

Table.propTypes = {
  leaders: PropTypes.arrayOf(String),
};

Table.defaultProps = {
  leaders: [],
};

export default Table;
