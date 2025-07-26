import React from 'react';
import '../stylesheets/mystyle.css';

function CalculateScore(props) {
  const { name, school, total, goal } = props;

  const average = (total / goal).toFixed(2);

  return (
    <div className="score-card">
      <h2>Student Score Calculator</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>School:</strong> {school}</p>
      <p><strong>Total Marks:</strong> {total}</p>
      <p><strong>Goal Subjects:</strong> {goal}</p>
      <p><strong>Average Score:</strong> {average}</p>
    </div>
  );
}

export default CalculateScore;
