import React, { useState } from 'react';
import GuestPage from './components/GuestPage';
import UserPage from './components/UserPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Toggle login state
  const toggleLogin = () => {
    setIsLoggedIn(prev => !prev);
  };

  // Define element variable
  let page;
  if (isLoggedIn) {
    page = <UserPage />;
  } else {
    page = <GuestPage />;
  }

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>🎫 Ticket Booking App</h1>
      <button onClick={toggleLogin}>
        {isLoggedIn ? 'Logout' : 'Login'}
      </button>
      <hr />
      {page}
    </div>
  );
}

export default App;
