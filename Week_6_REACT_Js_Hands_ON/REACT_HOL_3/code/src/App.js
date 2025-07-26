import React from 'react';
import CalculateScore from './components/CalculateScore';

function App() {
  return (
    <div>
      <CalculateScore 
        name="Jebin Dhas"
        school="Vel Tech Multi Tech"
        total={455}
        goal={5}
      />
    </div>
  );
}

export default App;
