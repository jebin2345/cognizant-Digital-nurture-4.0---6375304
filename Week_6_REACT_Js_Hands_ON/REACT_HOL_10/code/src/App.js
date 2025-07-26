import React from 'react';

function App() {
  const officeSpaces = [
    {
      name: 'Skyline View',
      rent: 75000,
      address: 'Tower A, Tech Park, Bengaluru',
      image: 'data:image/jpeg;base64,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',
    },
    {
      name: 'Green Work Hub',
      rent: 58000,
      address: 'Sector 45, Noida',
      image: 'https://via.placeholder.com/300x200?text=Green+Work+Hub',
    },
    {
      name: 'Ocean Tower',
      rent: 67000,
      address: 'Marine Drive, Mumbai',
      image: 'https://via.placeholder.com/300x200?text=Ocean+Tower',
    },
  ];

  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial' }}>
      <h1>🏢 Office Space Rental Portal</h1>

      {officeSpaces.map((office, index) => (
        <div key={index} style={{
          border: '1px solid #ccc',
          margin: '20px auto',
          padding: '20px',
          width: '350px',
          borderRadius: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
        }}>
          <img src={office.image} alt={office.name} style={{ width: '100%', borderRadius: '5px' }} />
          <h2>{office.name}</h2>
          <p><strong>Address:</strong> {office.address}</p>
          <p>
            <strong>Rent:</strong>
            <span style={{ color: office.rent < 60000 ? 'red' : 'green', fontWeight: 'bold' }}>
              ₹{office.rent}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default App;
