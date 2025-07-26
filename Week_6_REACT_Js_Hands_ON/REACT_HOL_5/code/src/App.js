import './App.css';
import { CohortsData } from './Cohort'; // ✅ ensure CohortsData is exported properly
import CohortDetails from './CohortDetails';

function App() {
  return (
    <div>
      <h1>Cohorts Details</h1>
      {CohortsData.map((cohort, index) => (
        <CohortDetails key={index} cohort={cohort} />
      ))}
    </div>
  );
}

export default App;
