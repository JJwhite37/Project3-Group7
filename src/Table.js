import React from 'react';
import PropTypes from 'prop-types';
import './Table.css';
import { useState, useEffect } from 'react';
import { UserInfo } from './UserInfo';

function Table(props) {
  const { currentMiners } = props;
  const [isShown, setIsShown] = useState(false);

  const result = [];
  let i;
  for (i = 0; i < currentMiners.length; i += 1) {
    result.push(
      <tr 
      onMouseEnter={() => setIsShown(true)}
      onMouseLeave={() => setIsShown(false)}>
        <td>{currentMiners[i][0]}</td>
        <td>{currentMiners[i][1]}</td>
        {isShown && (
        <div>
          <UserInfo/>
        </div>
        )}
        <br />
      </tr>,
      <br />,
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
