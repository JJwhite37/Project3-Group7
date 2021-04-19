import React from 'react';

export function Pool(props) {
  //const newList = [...props.list];

  return (
    <div class="pool">
      <div>Balance: {props.list[6]}</div>
      <div>Current Effective Hashrate: {props.list[0]}</div>
      <div>Average Effective Hashrate: {props.list[1]}</div>
      <div>Current Reported Hashrate: {props.list[2]}</div>
      <div>Valid Shares: {props.list[3]}</div>
      <div>Stale Shares: {props.list[4]}</div>
      <div>Invalid Shares: {props.list[5]}</div>
    </div>
  );
}
