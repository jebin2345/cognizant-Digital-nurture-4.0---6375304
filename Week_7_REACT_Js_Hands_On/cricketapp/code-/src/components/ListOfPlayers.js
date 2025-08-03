import React from 'react';

const ListOfPlayers = () => {
  const players = [
    { name: 'Rohit Sharma', score: 95 },
    { name: 'Virat Kohli', score: 88 },
    { name: 'Hardik Pandya', score: 42 },
    { name: 'Ravindra Jadeja', score: 67 },
    { name: 'Rishabh Pant', score: 73 },
    { name: 'Shubman Gill', score: 54 },
    { name: 'Jasprit Bumrah', score: 85 },
    { name: 'KL Rahul', score: 29 },
    { name: 'Mohammed Shami', score: 40 },
    { name: 'Surya Kumar', score: 90 },
    { name: 'Axar Patel', score: 75 },
  ];

  const lowScorers = players.filter(player => player.score < 70);

  return (
    <div>
      <h2>All Players:</h2>
      <ul>
        {players.map((player, index) => (
          <li key={index}>
            {player.name} - {player.score}
          </li>
        ))}
      </ul>

      <h2>Players with score below 70:</h2>
      <ul>
        {lowScorers.map((player, index) => (
          <li key={index}>
            {player.name} - {player.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListOfPlayers;
