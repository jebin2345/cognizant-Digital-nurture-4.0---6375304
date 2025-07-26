import React from 'react';

function UserPage() {
  return (
    <div>
      <h2>🧍 Book Your Tickets</h2>
      <p>Welcome User! You can now book flights.</p>
      <form>
        <label>Flight ID: <input type="text" /></label><br /><br />
        <label>Passenger Name: <input type="text" /></label><br /><br />
        <button type="submit">Book</button>
      </form>
    </div>
  );
}

export default UserPage;
