import React from 'react';
import PropTypes from 'prop-types';
import './Table.css';

function Table(props) {
  const { leaderboard } = props;
  
  const result = [];
  let i;
  for (i = 0; i < leaderboard.length; i += 1) {
    result.push(
        <tr>
          <td>{leaderboard[i][0]}</td>
          <td>{leaderboard[i][1]}</td>
          <br />
        </tr>,
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
