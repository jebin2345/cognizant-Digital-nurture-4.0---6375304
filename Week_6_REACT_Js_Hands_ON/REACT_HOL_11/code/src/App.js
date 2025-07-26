import React, { useState } from 'react';
import CurrencyConvertor from './CurrencyConvertor';

function App() {
  const [count, setCount] = useState(0);

  // Multiple method calls
  const handleIncrement = () => {
    increment();
    sayHello();
  };

  const increment = () => {
    setCount(prev => prev + 1);
  };

  const decrement = () => {
    setCount(prev => prev - 1);
  };

  const sayHello = () => {
    alert("Hello! Keep Clicking 🙂");
  };

  const sayWelcome = (msg) => {
    alert(msg);
  };

  const handleClick = (event) => {
    alert("I was clicked! [Synthetic Event]");
    console.log(event); // SyntheticEvent object
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '30px' }}>
      <h1>🧪 React Event Handling Example</h1>

      <h2>Counter: {count}</h2>
      <button onClick={handleIncrement}>Increase</button>
      &nbsp;
      <button onClick={decrement}>Decrease</button>

      <br /><br />
      <button onClick={() => sayWelcome("Welcome to React Events!")}>Say Welcome</button>

      <br /><br />
      <button onClick={handleClick}>OnPress</button>

      <br /><br />
      <CurrencyConvertor />
    </div>
  );
}

export default App;
