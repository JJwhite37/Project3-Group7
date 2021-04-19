import './Leaderboard.css';
import { useState, useEffect } from 'react';
import Table from './Table';

function Leaderboard(props) {
  const { socket } = props;

  const [leaderboard, setLeaderboard] = useState([]);

  console.log('In Leaderboard:');

  useEffect(() => {
    socket.on('leaderboard', (data) => {
      console.log('leaderboard event received!');
      console.log(data);

      setLeaderboard(data);
    });
  });

  console.log('In Leaderboard, leaderboard:');
  console.log(leaderboard);

  return (
    <div>
      <leaderboardHeader> Leaderboard:</leaderboardHeader>
      <br />
      <Table leaderboard={leaderboard} />
    </div>
  );
}

export default Leaderboard;
