import React, { useState } from 'react';

function CurrencyConvertor() {
  const [rupees, setRupees] = useState('');
  const [euros, setEuros] = useState(null);

  const handleSubmit = () => {
    const conversionRate = 0.011; // 1 INR ≈ 0.011 Euro (example)
    const converted = parseFloat(rupees) * conversionRate;
    setEuros(converted.toFixed(2));
  };

  return (
    <div style={{ marginTop: '40px' }}>
      <h2>💱 Currency Converter</h2>
      <input
        type="number"
        placeholder="Enter amount in ₹"
        value={rupees}
        onChange={(e) => setRupees(e.target.value)}
      />
      &nbsp;
      <button onClick={handleSubmit}>Convert to €</button>

      {euros !== null && (
        <p>{rupees} INR = <strong>{euros} EUR</strong></p>
      )}
    </div>
  );
}

export default CurrencyConvertor;
