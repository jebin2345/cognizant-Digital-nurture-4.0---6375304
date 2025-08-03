import React from 'react';

const IndianPlayers = () => {
  const oddTeam = ['Rohit', 'Hardik', 'Pant', 'Shami', 'Surya'];
  const evenTeam = ['Virat', 'Gill', 'Jadeja', 'Rahul', 'Bumrah'];

  // Destructuring
  const [odd1, odd2, ...oddRest] = oddTeam;
  const [even1, even2, ...evenRest] = evenTeam;

  // Merge using spread
  const T20players = ['Dhoni', 'Yuvraj'];
  const RanjiTrophyPlayers = ['Gambhir', 'Pujara'];
  const allPlayers = [...T20players, ...RanjiTrophyPlayers];

  return (
    <div>
      <h2>Odd Team Players</h2>
      <p>{odd1}, {odd2}, and others: {oddRest.join(', ')}</p>

      <h2>Even Team Players</h2>
      <p>{even1}, {even2}, and others: {evenRest.join(', ')}</p>

      <h2>Merged Players (T20 + Ranji)</h2>
      <ul>
        {allPlayers.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
    </div>
  );
};

export default IndianPlayers;
